<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PertanyaanDSN extends Model
{
    protected $table = 'pertanyaan_dosen';
    protected $primaryKey = 'pertanyaandsn_id';
    public $incrementing = true;
    public $timestamps = false;
    protected $dateFormat = 'U';

    public function kelas(){
        return $this->belongsTo(Kelas::class,'kelas_id');
    }

    public function menjawab_pertanyaan()
    {
        return $this->belongsToMany(Mahasiswa::class,'jawaban_mhs','pertanyaandsn_id','mahasiswa_id')
                    ->withPivot(['jawaban','score'])
                    ->as('jawaban_mhs');
    }
}
