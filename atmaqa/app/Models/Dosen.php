<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    protected $table = 'dosen';
    protected $primaryKey = 'dosen_id';
    public $incrementing = true;
    public $timestamps = false;
    protected $dateFormat = 'U';

    public function matkuls(){
        return $this->hasMany(MatKul::class,'dosen_id');
    }

    public function user()
    {
        return $this->hasOne(User::class,'dosen_id');
    }
}
