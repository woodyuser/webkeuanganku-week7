<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migrasi. Ini akan membuat tabel-tabel di database.
     */
    public function up(): void
    {
        // Membuat tabel 'users' untuk menyimpan data pengguna aplikasi.
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Membuat kolom 'id' sebagai primary key yang auto-increment.

            // Kolom 'name' bawaan Laravel dihilangkan sesuai permintaan.
            // $table->string('name'); // <-- BARIS INI DIKOMENTARI / DIHAPUS

            $table->string('email')->unique(); // Kolom 'email', tipe data string, dan nilainya harus unik.
            $table->string('nomor_handphone')->unique(); // Kolom 'nomor_handphone', tipe data string, dan nilainya harus unik.

            $table->string('google_refresh_token')->nullable(); // Kolom untuk menyimpan refresh token Google OAuth. Bisa kosong.

            $table->timestamp('email_verified_at')->nullable(); // Kolom untuk menandai kapan email pengguna diverifikasi. Bisa kosong.
            $table->string('password'); // Kolom 'password', tipe data string. Akan di-hash.
            $table->rememberToken(); // Kolom untuk fitur "Remember Me" saat login.
            $table->timestamps(); // Menambahkan dua kolom: 'created_at' dan 'updated_at'.
        });

        // Membuat tabel 'password_reset_tokens' untuk fitur reset password.
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // Membuat tabel 'sessions' untuk mengelola sesi pengguna.
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        // Migrasi lain yang mungkin ditambahkan Laravel secara default (misal cache, jobs).
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->mediumText('value');
            $table->integer('expiration');
        });

        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });
    }

    /**
     * Batalkan migrasi. Ini akan menghapus tabel-tabel yang dibuat oleh fungsi 'up()'.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('cache');
        Schema::dropIfExists('jobs');
    }
};