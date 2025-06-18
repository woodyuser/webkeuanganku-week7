<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controller;
use Google\Client;
use Google\Service\Sheets;
use Illuminate\Auth\Events\PasswordReset; // Digunakan untuk memicu event setelah reset password
use Illuminate\Support\Str; // Digunakan untuk Str::random()

class AuthController extends Controller
{
    private $client;

    public function __construct()
    {
        // Inisialisasi Google Client untuk fitur Google Sheets
        $this->client = new Client();
        $this->client->setClientId(env('GOOGLE_CLIENT_ID'));
        $this->client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $this->client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
        $this->client->setScopes([Sheets::SPREADSHEETS]);
        $this->client->setAccessType('offline');
        $this->client->setPrompt('select_account consent');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
            'nomor_handphone' => 'required|string|max:20|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'email' => $request->email,
            'nomor_handphone' => $request->nomor_handphone,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi berhasil',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->only(['id', 'email', 'nomor_handphone']),
        ], 201);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Email atau password salah'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->only(['id', 'email', 'nomor_handphone']),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Berhasil logout']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function redirectToGoogleAuth(Request $request)
    {
        $userId = $request->user()->id;
        $this->client->setState((string)$userId);
        $authUrl = $this->client->createAuthUrl();
        return response()->json(['auth_url' => $authUrl]);
    }

    public function handleGoogleCallback(Request $request)
    {
        if ($request->has('error')) {
            Log::error('Google Auth Error: ' . $request->get('error'));
            $frontendRedirectUrl = env('FRONTEND_URL', 'http://localhost:3000/catat-transaksi') . '?status=failed&message=' . urlencode('Otorisasi Google gagal atau dibatalkan.');
            return redirect($frontendRedirectUrl);
        }

        $code = $request->get('code');

        try {
            $accessToken = $this->client->fetchAccessTokenWithAuthCode($code);
            $this->client->setAccessToken($accessToken);

            $userId = $request->get('state');
            $user = User::find($userId);

            if ($user instanceof User) {
                if ($refreshToken = $this->client->getRefreshToken()) {
                    $user->google_refresh_token = $refreshToken;
                    $user->save();
                }
            } else {
                Log::error('Google callback gagal: User tidak ditemukan dengan ID dari state: ' . $userId);
                $frontendRedirectUrl = env('FRONTEND_URL', 'http://localhost:3000') . '?status=failed&message=' . urlencode('User tidak ditemukan saat callback Google.');
                return redirect($frontendRedirectUrl);
            }

            $frontendRedirectUrl = env('FRONTEND_URL', 'http://localhost:3000') . '?status=success';
            return redirect($frontendRedirectUrl);

        } catch (\Exception $e) {
            Log::error('Error fetching Google access token: ' . $e->getMessage());
            $frontendRedirectUrl = env('FRONTEND_URL', 'http://localhost:3000') . '?status=failed&message=' . urlencode('Terjadi kesalahan saat otorisasi Google.');
            return redirect($frontendRedirectUrl);
        }
    }

    /**
     * Mengubah password user secara langsung berdasarkan email dan password baru.
     * PERINGATAN KEAMANAN: Implementasi ini SANGAT TIDAK AMAN untuk aplikasi produksi.
     * Ini tidak melakukan verifikasi kepemilikan email. HANYA UNTUK TUJUAN TUGAS/DEMO.
     */
    public function resetPasswordDirect(Request $request)
    {
        // Validasi input: email, password, dan konfirmasi password
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email', // Email harus ada di tabel users
            'password' => 'required|confirmed|min:8', // Password minimal 8 karakter dan harus dikonfirmasi
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // Seharusnya user ditemukan karena sudah divalidasi dengan 'exists:users,email'
        if (!$user) {
            return response()->json(['message' => 'Email tidak terdaftar.'], 404);
        }

        // Hash password baru dan simpan ke database
        $user->password = Hash::make($request->password);
        $user->setRememberToken(Str::random(60)); // Perbarui remember token
        $user->save(); // Simpan perubahan ke database

        // Memicu event PasswordReset (opsional, jika ada listener yang bergantung pada event ini)
        event(new PasswordReset($user));

        return response()->json(['message' => 'Password berhasil diubah. Silakan login.'], 200);
    }
}