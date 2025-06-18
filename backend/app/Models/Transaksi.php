<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksis'; // Model ini tidak akan digunakan untuk DB lokal, tapi diperlukan untuk struktur kode

    /**
     * Atribut-atribut yang boleh diisi secara massal.
     * NAMA KOLOM DI SINI HARUS SESUAI DENGAN HEADER DI GOOGLE SHEETS KAMU.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        // 'user_id', // Tidak diperlukan di sini karena tidak disimpan di Sheetsmu
        'Tanggal',
        'Kartu',
        'Jenis',
        'Deskripsi',
        'Nominal (Rp)', // Pastikan spasi dan tanda kurung sesuai
        'Metode Pembayaran',
    ];

    /**
     * Atribut-atribut yang harus di-cast ke tipe data tertentu.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'Tanggal' => 'date',   // Mengkonversi string tanggal menjadi objek Carbon (tanggal)
        'Nominal (Rp)' => 'decimal:2', // Memastikan Nominal adalah desimal dengan 2 angka
    ];

    /**
     * Mendefinisikan relasi: Setiap Transaksi dimiliki oleh satu User.
     * Relasi ini tetap penting meskipun data transaksi di Sheets,
     * untuk mendapatkan user_id saat menambahkan transaksi.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}