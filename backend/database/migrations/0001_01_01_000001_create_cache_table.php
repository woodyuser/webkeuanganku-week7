<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migrasi.
     * cache akan disimpan dalam file, bukan di database.
     */
    public function up(): void
    {
        // Tidak ada operasi pembuatan tabel 'cache' di sini.
        // Biarkan kosong.
    }

    /**
     * Batalkan migrasi.
     */
    public function down(): void
    {
        // Tidak ada operasi penghapusan tabel 'cache' di sini.
        // Biarkan kosong.
    }
};