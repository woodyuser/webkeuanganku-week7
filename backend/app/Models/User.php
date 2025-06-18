<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail; // Bisa dihapus jika Anda tidak menggunakan verifikasi email
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'nomor_handphone', // Pastikan ini juga ada jika Anda menggunakannya
        'password',
        'google_refresh_token', // Tambahkan ini jika Anda menyimpan token refresh Google
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google_refresh_token', // Sembunyikan ini dari output API jika sensitif
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Laravel akan otomatis menghash password saat disimpan
    ];

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        // Biarkan kosong atau hapus sepenuhnya.
        // Dalam alur reset password langsung, kita tidak perlu notifikasi ini.
    }
}