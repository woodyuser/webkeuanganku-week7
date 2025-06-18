<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migrasi.
     *  fitur jobs tidak akan menggunakan tabel database untuk sementara.
     */
    public function up(): void
    {
        // Tidak ada operasi pembuatan tabel 'jobs' di sini.
        // Biarkan kosong.
    }

    /**
     * Batalkan migrasi.
     *  mengosongkan ini.
     */
    public function down(): void
    {
        // Tidak ada operasi penghapusan tabel 'jobs' di sini.
        // Biarkan kosong.
    }
};