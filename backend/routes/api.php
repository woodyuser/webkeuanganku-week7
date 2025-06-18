<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransaksiController;

/*
|--------------------------------------------------------------------------
| Rute-Rute API Publik
|--------------------------------------------------------------------------
|
| Rute ini bisa diakses oleh siapa saja, tanpa perlu login atau token.
|
| - /register: Untuk pendaftaran user baru.
| - /login: Untuk login user.
| - /google/callback: Callback URL setelah otorisasi Google Sheets (dipanggil oleh Google).
| - /reset-password-direct: Untuk mengubah password user secara langsung (tanpa verifikasi email).
|   PERINGATAN: Rute ini SANGAT TIDAK AMAN untuk produksi!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/google/callback', [AuthController::class, 'handleGoogleCallback']);
Route::post('/reset-password-direct', [AuthController::class, 'resetPasswordDirect']);


/*
|--------------------------------------------------------------------------
| Rute-Rute API Terproteksi
|--------------------------------------------------------------------------
|
| Rute ini memerlukan autentikasi. User harus mengirimkan
| Bearer Token yang valid di header Authorization untuk mengaksesnya.
|
| - /logout: Untuk logout user.
| - /user: Untuk mendapatkan data user yang sedang login.
| - /google/auth: Untuk memulai proses otorisasi Google Sheets (memerlukan user login).
| - /transaksis: Untuk operasi CRUD (Create, Read, Update, Delete) transaksi.
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/google/auth', [AuthController::class, 'redirectToGoogleAuth']);
    Route::apiResource('transaksis', TransaksiController::class);
});


/*
|--------------------------------------------------------------------------
| Rute untuk Pengujian
|--------------------------------------------------------------------------
|
| Rute ini hanya untuk tujuan pengujian sederhana.
|
*/
Route::get('/test', function () {
    return ['status' => 'Halo dari rute tes!'];
});