<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Week extends Model
{
    protected $table = 'weekly_class';
    protected $primaryKey = 'minggukelass_id';
    public $incrementing = true;
    public $timestamps = false;
    protected $dateFormat = 'U';

    public function kelas(){
        return $this->belongsTo(Kelas::class,'kelas_id');
    }

    public function pertanyaanMahasiswa(){
        return $this->hasMany(pertanyaanMahasiswa::class,'kelas_id');
    }
}
