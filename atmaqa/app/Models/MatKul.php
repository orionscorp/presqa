<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatKul extends Model
{
    protected $table = 'mata_kuliah';
    protected $primaryKey = 'matkul_id';
    public $incrementing = true;
    public $timestamps = false;
    protected $dateFormat = 'U';

    public function dosen(){
        return $this->belongsTo(Dosen::class,'dosen_id');
    }

    public function kelass(){
        return $this->hasMany(Kelas::class,'matkul_id');
    }
}
