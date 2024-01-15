<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    protected $table = 'kelas';
    protected $primaryKey = 'kelas_id';
    public $incrementing = true;
    public $timestamps = false;
    protected $dateFormat = 'U';

    public function pertanyaandosens(){
        return $this->hasMany(PertanyaanDSN::class,'kelas_id');
    }

    public function pertanyaanmahasiswas(){
        return $this->hasMany(PertanyaanMHS::class,'kelas_id');
    }

    public function matkul(){
        return $this->belongsTo(MatKul::class,'matkul_id');
    }
}
