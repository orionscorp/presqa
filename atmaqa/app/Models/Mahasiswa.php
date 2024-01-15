<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    protected $table = 'mahasiswa';
    protected $primaryKey = 'mahasiswa_id';
    public $incrementing = true;
    public $timestamps = false;
    protected $dateFormat = 'U';

    public function pertanyaanmahasiswas(){
        return $this->hasMany(PertanyaanMHS::class,'mahasiswa_id');
    }

    public function menjawab_pertanyaan()
    {
        return $this->belongsToMany(PertanyaanDSN::class,'jawaban_mhs','mahasiswa_id','pertanyaandsn_id')
                    ->withPivot(['jawaban','score'])
                    ->as('jawaban_mhs');
    }

    public function user()
    {
        return $this->hasOne(User::class,'mahasiswa_id');
    }
}
