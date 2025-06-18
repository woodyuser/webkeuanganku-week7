<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migrasi.
     * personal access tokens akan dikelola tanpa tabel database ini.
     */
    public function up(): void
    {
        // Tidak ada operasi pembuatan tabel 'personal_access_tokens' di sini.
        // Biarkan kosong.
    }

    /**
     * Batalkan migrasi.
     */
    public function down(): void
    {
        // Tidak ada operasi penghapusan tabel 'personal_access_tokens' di sini.
        // Biarkan kosong.
    }
};