<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PertanyaanMHS extends Model
{
    protected $table = 'pertanyaan_mahasiswa';
    protected $primaryKey = 'pertanyaanmhs_id';
    public $incrementing = true;
    public $timestamps = false;
    protected $dateFormat = 'U';

    public function kelas(){
        return $this->belongsTo(Kelas::class,'kelas_id');
    }

    public function mahasiswa(){
        return $this->belongsTo(Mahasiswa::class,'mahasiswa_id');
    }
}
