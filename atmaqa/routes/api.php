<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\MatKulController;
use App\Http\Controllers\PertanyaanMHSController;
use App\Http\Controllers\AuthController;
use App\Models\PertanyaanMHS;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::resource('/dosen', DosenController::class)->only(['index', 'store', 'update', 'show']);


Route::middleware('auth:api')->group(function() {

    //user
    Route::get('/users','App\Http\Controllers\UserController@index')->middleware('can:admin-only');
    Route::get('/users/{id}','App\Http\Controllers\UserController@show')->middleware('can:admin-only');

    //mhs
    Route::resource('/mahasiswa', MahasiswaController::class)->only(['index', 'store', 'update', 'show'])->middleware('can:admin-only');
    Route::post('/search-mahasiswa','App\Http\Controllers\MahasiswaController@search')->middleware('can:admin-only');
    Route::post('/delete-mahasiswa','App\Http\Controllers\MahasiswaController@destroy')->middleware('can:admin-only');
    Route::post('/change-status-mahasiswa','App\Http\Controllers\MahasiswaController@changeStatsMhs');
    // Route::put('/mahasiswa/{mahasiswa}/{user}','App\Http\Controllers\MahasiswaController@update');
    // Route::patch('/mahasiswa/{mahasiswa}/{user}','App\Http\Controllers\MahasiswaController@update');
    
    //dosen
    Route::resource('/dosen', DosenController::class)->only(['index', 'store', 'update', 'show'])->middleware('can:admin-only');
    Route::post('/search-dosen','App\Http\Controllers\DosenController@search')->middleware('can:admin-only');
    Route::post('/delete-dosen','App\Http\Controllers\DosenController@destroy')->middleware('can:admin-only');
    
    //matkul
    Route::resource('/matkul', MatKulController::class)->only(['index', 'store', 'update', 'show'])->middleware('can:admin-and-dosen');
    Route::post('/search-matkul','App\Http\Controllers\MatKulController@search')->middleware('can:admin-and-dosen');
    Route::post('/get-dosen-course','App\Http\Controllers\MatKulController@dosenCourse');
    Route::post('/delete-course','App\Http\Controllers\MatKulController@destroy');

    //kelas
    // Route::group();
    Route::resource('/kelas', KelasController::class)->only(['index', 'store', 'update', 'show'])->middleware('can:admin-and-dosen');
    // Route::resource('/kelas', KelasController::class)->only(['index', 'store', 'update', 'show'])->middleware('can:dosen-only');
    Route::post('/search-kelas','App\Http\Controllers\KelasController@search')->middleware('can:admin-and-dosen');
    Route::post('/get-dosen-kelas','App\Http\Controllers\KelasController@dosenClass');
    Route::post('/add-week','App\Http\Controllers\KelasController@addWeek');
    Route::post('/get-week','App\Http\Controllers\KelasController@indexWeek');
    Route::post('/getOne-week','App\Http\Controllers\KelasController@getWeek');
    Route::get('/get-kelas-mhs','App\Http\Controllers\KelasController@getKelasMhs');
    Route::post('/cek-kelas','App\Http\Controllers\KelasController@cekKelas');
    Route::post('/cek-kelas-minggu','App\Http\Controllers\KelasController@cekKelasMinggu');
    Route::post('/update-status-kelas','App\Http\Controllers\KelasController@setStatus');
    Route::post('/delete-kelas','App\Http\Controllers\KelasController@destroy')->middleware('can:admin-only');
    Route::post('/search-kelas-mhs','App\Http\Controllers\KelasController@searchKlsMhs');
    Route::post('/search-kelas-dsn','App\Http\Controllers\KelasController@searchKlsDsn');


    Route::post('/get-student-class-detail','App\Http\Controllers\KelasController@studentClassDetail');

    //enroll
    Route::post('/get-enroll-history','App\Http\Controllers\KelasController@getEnrollHistory');
    Route::post('/validate-enroll','App\Http\Controllers\KelasController@validateEnroll');
    Route::post('/set-enroll','App\Http\Controllers\KelasController@setEnroll');


    //pertanyaanmhs
    Route::resource('/pertanyaan', PertanyaanMHSController::class)->only(['index', 'store', 'update']);
    // ->middleware('can:admin-and-dosen');
    Route::post('/index-pertanyaan','App\Http\Controllers\PertanyaanMHSController@indexPertanyaanMhs');
    Route::post('/get-pertanyaan','App\Http\Controllers\PertanyaanMHSController@show');
    Route::post('/delete-pertanyaan','App\Http\Controllers\PertanyaanMHSController@delete');
    Route::post('/search-pertanyaan','App\Http\Controllers\PertanyaanMHSController@search');
    Route::post('/get-pertanyaan-mhs','App\Http\Controllers\PertanyaanMHSController@indexPertanyaanMhsByDosen');
    Route::post('/answer-question-mhs','App\Http\Controllers\PertanyaanMHSController@answerQuestionMhs');
    Route::post('/set-shown','App\Http\Controllers\PertanyaanMHSController@setShown');
    Route::post('/show-shown','App\Http\Controllers\PertanyaanMHSController@indexPinned');
    
    //pertanyaanDSN
    Route::post('/add-question-dsn','App\Http\Controllers\PertanyaanDSNController@store');
    Route::post('/add-multi-question-dsn','App\Http\Controllers\PertanyaanDSNController@storeMulti');
    Route::post('/validate-dosen-question','App\Http\Controllers\PertanyaanDSNController@validatePertanyaanDsn');
    Route::post('/get-quiz','App\Http\Controllers\PertanyaanDSNController@soal');
    Route::post('/show-quiz','App\Http\Controllers\PertanyaanDSNController@show');
    Route::post('/show-mhs','App\Http\Controllers\PertanyaanDSNController@showMhs');
    Route::post('/cek-tipe-soal','App\Http\Controllers\PertanyaanDSNController@cekTipeSoal');
    Route::post('/get-pertanyaan-dosen-per-minggu','App\Http\Controllers\PertanyaanDSNController@indexPertanyaanDosen');
    Route::post('/get-pertanyaan-dosen','App\Http\Controllers\PertanyaanDSNController@getPertanyaanDsn');
    Route::post('/edit-pertanyaan-dosen','App\Http\Controllers\PertanyaanDSNController@edit');

    //jawaban
    Route::post('/add-jawaban','App\Http\Controllers\jawabanController@addJawaban');
    Route::post('/cek-jawab','App\Http\Controllers\jawabanController@pernahJawab');
    Route::post('/cek-semua-jawab','App\Http\Controllers\jawabanController@cekPernahJawab');
    Route::post('/nilai-jawaban','App\Http\Controllers\jawabanController@nilaiJawaban');
    Route::post('/koreksi-jawaban','App\Http\Controllers\jawabanController@koreksiJawaban');

    
    Route::post('/logout','App\Http\Controllers\AuthController@logout');
});

Route::get('/get-access-token','App\Http\Controllers\RecordController@getAccessToken');

Route::post('/login','App\Http\Controllers\AuthController@login');

//test
Route::get('/test','App\Http\Controllers\UserController@test');

Route::middleware('auth:api')->get('/user',function (Request $request) {
    $cekuser = $request->user();

    if($cekuser->mahasiswa_id === null && $cekuser->dosen_id !== null)
    {
        $dosen = DB::table('users')
                    ->join('dosen', 'users.dosen_id', '=', 'dosen.dosen_id')
                    ->select( 'dosen.dosen_name as name', 'dosen.dosen_id as id')
                    ->where('dosen.dosen_id', $cekuser->dosen_id)
                    ->first();
        $dosen->role = 'dosen';
        return response()->json(['userloggedin' => $dosen]);
    } 

    else if($cekuser->mahasiswa_id === null && $cekuser->dosen_id === null){
        $admin = DB::table('users')
                    ->select('email as name')
                    ->where('id', '=', $cekuser->id)
                    ->first();
        $admin->role = 'admin';
        return response()->json(['userloggedin' => $admin]);
    } 
    
    else if($cekuser->mahasiswa_id !== null && $cekuser->dosen_id === null){
        $mahasiswa = DB::table('users')
                    ->join('mahasiswa', 'users.mahasiswa_id', '=', 'mahasiswa.mahasiswa_id')
                    ->select('mahasiswa.mahasiswa_name as name','mahasiswa.mahasiswa_id as id','mahasiswa.status_mahasiswa as stats')
                    ->where('mahasiswa.mahasiswa_id','=', $cekuser->mahasiswa_id)
                    ->first();

        $mahasiswa->role = 'mahasiswa';
        return response()->json(['userloggedin' => $mahasiswa]);
    } else {
        return response()->json(['message' => 'Unauthorized' ]);
    }
});
