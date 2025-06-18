<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Google\Client;
use Google\Service\Sheets;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Routing\Controller;

class TransaksiController extends Controller
{
    
    private $client;
    private $sheetsService;
    private $spreadsheetId;
    private $defaultRange;
    private $headerRowNumber;

    public function __construct()
    {
        $this->client = new Client();
        $this->client->setClientId(env('GOOGLE_CLIENT_ID'));
        $this->client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $this->client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));

        $this->client->setScopes([Sheets::SPREADSHEETS]);
        $this->client->setAccessType('offline');

        $this->spreadsheetId = env('GOOGLE_SHEET_ID');
        $this->defaultRange = env('GOOGLE_SHEET_RANGE', 'Sheet1!A:Z');
        $this->headerRowNumber = env('GOOGLE_SHEET_HEADER_ROW', 1);

        $this->sheetsService = new Sheets($this->client);
    }

    private function setAccessTokenForUser(User $user)
    {
        if (empty($user->google_refresh_token)) {
            throw new \Exception('Google refresh token tidak ditemukan. Silakan otorisasi ulang Google Sheets Anda.');
        }

        $this->client->setAccessToken([
            'refresh_token' => $user->google_refresh_token
        ]);

        try {
            $accessToken = $this->client->fetchAccessTokenWithRefreshToken($user->google_refresh_token);
            $this->client->setAccessToken($accessToken);

            if (isset($accessToken['refresh_token']) && $accessToken['refresh_token'] !== $user->google_refresh_token) {
                $user->google_refresh_token = $accessToken['refresh_token'];
                $user->save();
            }
        } catch (\Exception $e) {
            Log::error('Gagal mendapatkan access token Google untuk user ID ' . $user->id . ': ' . $e->getMessage());
            throw new \Exception('Gagal mengakses Google Sheets. Silakan otorisasi ulang Google Sheets Anda.');
        }
    }

    private function getSheetHeaders()
    {
        $sheetName = explode('!', $this->defaultRange)[0];
        $headerRange = $sheetName . '!A' . $this->headerRowNumber . ':Z' . $this->headerRowNumber;
        $response = $this->sheetsService->spreadsheets_values->get($this->spreadsheetId, $headerRange);
        return $response->getValues()[0] ?? [];
    }

    public function index(Request $request)
    {
        try {
            $this->setAccessTokenForUser($request->user());

            $headers = $this->getSheetHeaders();
            if (empty($headers)) {
                return response()->json(['message' => 'Gagal membaca header Google Sheet. Pastikan sheet tidak kosong dan GOOGLE_SHEET_RANGE benar.'], 500);
            }

            $dataRange = explode('!', $this->defaultRange)[0] . '!A' . ($this->headerRowNumber + 1) . ':' . explode('!', $this->defaultRange)[1];
            $response = $this->sheetsService->spreadsheets_values->get($this->spreadsheetId, $dataRange);
            $values = $response->getValues();

            if (empty($values)) {
                return response()->json([], 200);
            }

            $transaksis = [];
            foreach ($values as $index => $row) {
                $transaksi = [];
                foreach ($headers as $headerIndex => $header) {
                    $transaksi[$header] = $row[$headerIndex] ?? null;
                }
                $transaksi['id'] = ($this->headerRowNumber + 1) + $index;
                $transaksis[] = $transaksi;
            }

            return response()->json($transaksis);

        } catch (\Exception $e) {
            Log::error('Error fetching data from Google Sheets: ' . $e->getMessage());
            return response()->json(['message' => 'Gagal mengambil data transaksi: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Tanggal' => 'required|date_format:Y-m-d',
            'Kartu' => 'required|string|max:100',
            'Jenis' => 'required|in:Pemasukan,Pengeluaran',
            'Deskripsi' => 'nullable|string',
            'Nominal (Rp)' => 'required|numeric|min:0',
            'Metode Pembayaran' => 'required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $this->setAccessTokenForUser($request->user());

            $valuesToAppend = [
                $request->Tanggal,
                $request->Kartu,
                $request->Jenis,
                $request->Deskripsi,
                (float)str_replace(['Rp', ',', '.', ' '], '', $request->input('Nominal (Rp)')),
                $request->input('Metode Pembayaran'),
                // Kolom tambahan otomatis (jika kamu mau menambahkannya di Sheetsmu)
                // Carbon::now()->format('Y-m-d H:i:s'), // created_at
                // Carbon::now()->format('Y-m-d H:i:s'), // updated_at
                // $request->user()->id // user_id yang membuat transaksi ini
            ];

            $body = new Sheets\ValueRange([
                'values' => [$valuesToAppend]
            ]);

            $rangeAppend = explode('!', $this->defaultRange)[0] . '!A:F';
            $params = ['valueInputOption' => 'USER_ENTERED'];

            $response = $this->sheetsService->spreadsheets_values->append($this->spreadsheetId, $rangeAppend, $body, $params);

            return response()->json([
                'message' => 'Transaksi berhasil ditambahkan ke Google Sheets',
                'transaksi' => $request->all(),
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error writing data to Google Sheets: ' . $e->getMessage());
            return response()->json(['message' => 'Gagal menambahkan transaksi: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Menampilkan detail transaksi berdasarkan ID.
     * Endpoint: GET /api/transaksis/{id}
     * 'id' diasumsikan sebagai NOMOR BARIS (row number) di Google Sheet.
     */
    public function show(string $id, Request $request)
    {
        try {
            $this->setAccessTokenForUser($request->user());

            $rowNumber = (int)$id;
            if ($rowNumber <= $this->headerRowNumber) {
                return response()->json(['message' => 'ID transaksi tidak valid. Nomor baris harus lebih dari ' . $this->headerRowNumber . '.'], 400);
            }

            $headers = $this->getSheetHeaders();
            if (empty($headers)) {
                return response()->json(['message' => 'Gagal membaca header sheet. Pastikan sheet tidak kosong.'], 500);
            }

            $sheetName = explode('!', $this->defaultRange)[0];
            $dataRange = $sheetName . '!A' . $rowNumber . ':F' . $rowNumber;
            $response = $this->sheetsService->spreadsheets_values->get($this->spreadsheetId, $dataRange);
            $values = $response->getValues();

            if (empty($values) || empty($values[0])) {
                return response()->json(['message' => 'Transaksi tidak ditemukan di baris ini.'], 404);
            }

            $transaksi = [];
            foreach ($headers as $index => $header) {
                $transaksi[$header] = $values[0][$index] ?? null;
            }
            $transaksi['id'] = $rowNumber;

            return response()->json($transaksi);

        } catch (\Exception $e) {
            Log::error('Error fetching single transaction from Google Sheets: ' . $e->getMessage());
            return response()->json(['message' => 'Gagal mengambil detail transaksi: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage (Mengupdate transaksi yang sudah ada).
     * Endpoint: PUT/PATCH /api/transaksis/{id}
     * 'id' diasumsikan sebagai NOMOR BARIS (row number) di Google Sheet.
     */
    public function update(Request $request, string $id)
    {
        try {
            $this->setAccessTokenForUser($request->user());

            $rowNumber = (int)$id;
            if ($rowNumber <= $this->headerRowNumber) {
                return response()->json(['message' => 'ID transaksi tidak valid. Nomor baris harus lebih dari ' . $this->headerRowNumber . '.'], 400);
            }

            $headers = $this->getSheetHeaders();
            if (empty($headers)) {
                return response()->json(['message' => 'Gagal membaca header sheet untuk update. Pastikan sheet tidak kosong.'], 500);
            }

            $sheetName = explode('!', $this->defaultRange)[0];
            $currentDataRange = $sheetName . '!A' . $rowNumber . ':F' . $rowNumber;
            $currentDataResponse = $this->sheetsService->spreadsheets_values->get($this->spreadsheetId, $currentDataRange);
            $currentValues = $currentDataResponse->getValues();

            if (empty($currentValues) || empty($currentValues[0])) {
                return response()->json(['message' => 'Baris transaksi tidak ditemukan untuk diupdate.'], 404);
            }

            $updatedRowData = $currentValues[0];
            $requestData = $request->all();
            foreach ($headers as $index => $header) {
                if (isset($requestData[$header])) {
                    $value = $requestData[$header];
                    // Konversi nominal jika perlu
                    if ($header === 'Nominal (Rp)') {
                        $value = (float)str_replace(['Rp', ',', '.', ' '], '', $value);
                    }
                    $updatedRowData[$index] = $value;
                }
            }

            $body = new Sheets\ValueRange([
                'values' => [$updatedRowData]
            ]);

            $updateRange = $sheetName . '!A' . $rowNumber . ':F' . $rowNumber;
            $params = ['valueInputOption' => 'USER_ENTERED'];

            $response = $this->sheetsService->spreadsheets_values->update($this->spreadsheetId, $updateRange, $body, $params);

            return response()->json([
                'message' => 'Transaksi berhasil diupdate di Google Sheets',
                'transaksi' => array_combine($headers, $updatedRowData),
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating data in Google Sheets: ' . $e->getMessage());
            return response()->json(['message' => 'Gagal mengupdate transaksi: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage (Menghapus transaksi).
     * Endpoint: DELETE /api/transaksis/{id}
     * 'id' diasumsikan sebagai NOMOR BARIS (row number) di Google Sheet.
     */
    public function destroy(string $id, Request $request)
    {
        try {
            $this->setAccessTokenForUser($request->user());

            $rowNumber = (int)$id;
            if ($rowNumber <= $this->headerRowNumber) {
                return response()->json(['message' => 'ID transaksi tidak valid. Nomor baris harus lebih dari ' . $this->headerRowNumber . '.'], 400);
            }

            $sheetName = explode('!', $this->defaultRange)[0];
            $clearRange = $sheetName . '!A' . $rowNumber . ':F' . $rowNumber;
            $body = new Sheets\BatchClearValuesRequest([
                'ranges' => [$clearRange]
            ]);

            $this->sheetsService->spreadsheets_values->batchClear($this->spreadsheetId, $body);

            return response()->json(['message' => 'Transaksi berhasil dihapus (baris dikosongkan) dari Google Sheets']);

        } catch (\Exception $e) {
            Log::error('Error deleting data from Google Sheets: ' . $e->getMessage());
            return response()->json(['message' => 'Gagal menghapus transaksi: ' . $e->getMessage()], 500);
        }
    }
}