<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Di sini kamu bisa mengkonfigurasi pengaturan untuk Cross-Origin Resource Sharing
    | atau "CORS". Ini menentukan domain mana yang diizinkan untuk mengakses
    | API kamu melalui permintaan HTTP lintas origin.
    |
    */

    // Jalur (paths) URL yang akan menerapkan aturan CORS.
    // Tambahkan semua rute API yang akan diakses dari frontend.
    // 'api/*' akan mencakup '/api/register', '/api/login', dll.
    // Tambahkan juga rute spesifik seperti /api/google/* dan /api/transaksis/*.
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register', 'user', 'google/*', 'transaksis/*'],

    // Metode HTTP yang diizinkan (GET, POST, PUT, DELETE, OPTIONS).
    // '*' berarti semua metode diizinkan. Ini umum untuk API.
    'allowed_methods' => ['*'],

    // Domain (origin) yang diizinkan untuk membuat permintaan ke API ini.
    // INI SANGAT PENTING. Ganti 'http://localhost:3000' dengan URL di mana aplikasi React kamu berjalan.
    // Pastikan ini adalah alamat dan port yang digunakan server pengembangan React-mu.
'allowed_origins' => [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
],


    // Header yang diizinkan dalam permintaan.
    // '*' berarti semua header diizinkan. Ini umum untuk API.
    'allowed_headers' => ['*'],

    // Header yang diizinkan untuk diekspos ke browser (client-side).
    'exposed_headers' => [],

    // Waktu maksimal (dalam detik) untuk hasil preflight request (OPTIONS).
    'max_age' => 0,

    // Apakah permintaan akan menyertakan kredensial (seperti cookie).
    // Set 'false' jika menggunakan otentikasi berbasis Bearer Token (seperti Laravel Sanctum API Token).
    // Set 'true' jika kamu menggunakan cookie-based authentication (SPA Sanctum).
    'supports_credentials' => false,
];