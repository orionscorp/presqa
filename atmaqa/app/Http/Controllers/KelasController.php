<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KelasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $kelas = Kelas::all();
        $kelas = DB::table('kelas as k')
                    ->join('mata_kuliah as mk','mk.matkul_id','=','k.matkul_id')
                    ->join('dosen as d','d.dosen_id','=','mk.dosen_id')
                    ->select('k.*','mk.*','d.*')
                    ->where('d.status','aktif')
                    ->where('mk.status','aktif')
                    ->where('k.status','aktif')
                    ->get();

        if(count($kelas)>0) {
            return response()->json([
                'success' => true,
                'message' => 'Retrieve All Success',
                'kelas' => $kelas
            ], 200);
        }

        return response()->json([
            'message' => 'Retrieve All Empty',
            'kelas' => null
        ], 204);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'hari' => ['required'],
            'sesi'=> ['required'],
            'matkul_id' => ['required'],
        ]);
        $kelas = new Kelas();
        $kelas->kelas_name = $request["name"];
        $kelas->hari = $request["hari"];
        $kelas->sesi = $request["sesi"];
        $kelas->matkul_id = $request["matkul_id"];
        $kelas->password_kelas = $request->password_kelas;
        $kelas->status = 'aktif';

        if ($kelas->save()) {
            $last_id = $kelas->kelas_id;

            for($i=1; $i < 15; $i++){
                try{
                    DB::table('weekly_class')->insert([
                        'minggu_ke' => $i,
                        'kelas_id' => $last_id,
                        'status_kelas' => 'Closed',
                    ]);
                }catch (Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message'=>$e->getMessage()
                    ], 401);
                }
            }


            return response()->json([
                'success' => true,
                'message' => 'Add Kelas Success!',
                'kelas' => $kelas,
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Add Kelas Failed!',
                'kelas' => $kelas,
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dosen  $dosen
     * @return \Illuminate\Http\Response
     */
    public function show(Kelas $kela)
    {
        $matkul = DB::table('kelas')
                        ->join('mata_kuliah','kelas.matkul_id','=','mata_kuliah.matkul_id')
                        ->join('dosen','mata_kuliah.dosen_id','=','dosen.dosen_id')
                        ->select('mata_kuliah.matkul_name','dosen.dosen_name','mata_kuliah.matkul_id')
                        ->where('kelas.kelas_id',$kela->kelas_id)
                        ->first();

        return response()->json([
            'success' => true,
            'message' => 'Retrieve Kelas Success',
            'kelas' => $kela,
            'matkul' => $matkul,
        ], 200);
    }

    //search
    public function search(Request $request)
    {
        try{
            $kelas = DB::table('kelas')
                        ->select('kelas_name','hari','sesi','kelas_id')
                        ->where('kelas_name', 'LIKE', "$request->name%")
                        ->get();

            if(count($kelas)>0){
                return response()->json([
                    'success' => true,
                    'message' => 'Retrieve Class Success!',
                    'kelas' => $kelas,
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => 'Retrieve Class Empty!',
                'kelas' => null,
            ],200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message'=>$e->getMessage()
            ], 401);
        }
    }

    public function searchKlsMhs(Request $request)
    {
        try{
            $kelas = DB::table('kelas as k')
                        ->join('enroll_history as eh','eh.kelas_id','=','k.kelas_id')
                        ->select('k.kelas_name','k.hari','k.sesi','k.kelas_id')
                        ->where('eh.mahasiswa_id',$request->mid)
                        ->where('k.status','aktif')
                        ->where('k.kelas_name', 'LIKE', "$request->name%")
                        ->get();

            if(count($kelas)>0){
                return response()->json([
                    'success' => true,
                    'message' => 'Retrieve Class Success!',
                    'kelas' => $kelas,
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => 'Retrieve Class Empty!',
                'kelas' => null,
            ],200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message'=>$e->getMessage()
            ], 401);
        }
    }

    public function searchKlsDsn(Request $request)
    {
        try{
            $kelas = DB::table('kelas as k')
                        ->join('mata_kuliah as mk','mk.matkul_id','=','k.matkul_id')
                        ->select('k.kelas_name','k.hari','k.sesi','k.kelas_id')
                        ->where('mk.dosen_id',$request->did)
                        ->where('k.status','aktif')
                        ->where('k.kelas_name', 'LIKE', "$request->name%")
                        ->get();

            if(count($kelas)>0){
                return response()->json([
                    'success' => true,
                    'message' => 'Retrieve Class Success!',
                    'kelas' => $kelas,
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => 'Retrieve Class Empty!',
                'kelas' => null,
            ],200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message'=>$e->getMessage()
            ], 401);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Dosen  $dosen
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Kelas $kelas, $id)
    {
        $request->validate([
            'name' => ['required'],
            'hari' => ['required'],
            'sesi'=> ['required'],
            'matkul_id' => ['required'],
        ]);

        $kelas->kelas_name = $request["name"];
        $kelas->hari = $request["hari"];
        $kelas->sesi = $request["sesi"];
        $kelas->matkul_id = $request["matkul_id"];

        try{
            DB::table('kelas')
            ->where('kelas_id',$id)
            ->update([
                'kelas_name' => $kelas->kelas_name,
                'hari' => $kelas->hari, 
                'sesi' => $kelas->sesi, 
                'matkul_id' => $kelas->matkul_id, 
            ]);

            return response()->json([
                        'success' => true,
                        'message' => 'Update Kelas Success!',
                        'kelas' => $kelas,
                    ], 200);
        }catch(Exception $e){
            return response()->json([
                        'success' => false,
                        'message' => 'Update Kelas Failed!',
                        'kelas' => $kelas,
                    ], 400);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dosen  $dosen
     * @return \Illuminate\Http\Response
     */
    // public function destroy(Dosen $dosen)
    // {
    //     //
    // }

    //get kelas based on dosen
    public function dosenClass(Request $request){
        $kelas = DB::table('kelas')
                ->join('mata_kuliah','kelas.matkul_id','=','mata_kuliah.matkul_id')
                ->join('dosen','mata_kuliah.dosen_id','=','dosen.dosen_id')
                ->select('kelas.*')
                ->where('dosen.dosen_id',$request->id)
                ->get();

        return response()->json([
            'success' => true,
            'message' => 'Retrieve Kelas Success',
            'kelas' => $kelas,
        ], 200);
    }

    //add new week
    public function addWeek(Request $request){
        $request->validate([
            'minggu_ke' => ['required'],
            'kelas_id' => ['required'],
            'password_kelas' => ['required'],
        ]);

        try{
            DB::table('weekly_class')->insert([
                'minggu_ke' => $request->minggu_ke,
                'kelas_id' => $request->kelas_id,
                'status_kelas' => 'Open',
                'password_kelas' => $request->password_kelas,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Add Week Success!'
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message'=>$e->getMessage()
            ], 401);
        }
    }

    //get all week
    public function indexWeek(Request $request) {
        $week = DB::table('weekly_class')
                    ->select('minggu_ke as week',  'kelas_id as id', 'status_kelas as class_status', 'minggukelas_id as id')
                    ->where('kelas_id', $request->id)
                    ->get();

        return response()->json([
            'success' => true,
            'message' => 'Retrieve Kelas Success',
            'week' => $week,
        ], 200);
    }

    //get 1 week
    public function getWeek( Request $request){
        $week = DB::table('weekly_class')
                    ->select('minggu_ke as week', 'status_kelas as class_status', 'kelas_id as id')
                    ->where('minggukelas_id', $request->weekid)
                    ->first();

        return response()->json([
            'success' => true,
            'message' => 'Retrieve Kelas Success',
            'week' => $week,
        ], 200);
    }

    //set status kelas
    public function setStatus( Request $request){
        $weekStats = DB::table('weekly_class')
                    ->select('status_kelas')
                    ->where('minggukelas_id', '=',$request->id)
                    ->first();

        if($weekStats->status_kelas === 'Open'){
            try{
                DB::table('weekly_class')
                                ->where('minggukelas_id',$request->id)
                                ->update(['status_kelas' => 'Closed']);
                
                return response()->json([
                            'success' => true,
                            'message' => 'Update Status Success!',
                        ], 200);
            }catch(Exception $e){
                return response()->json([
                    'success' => false,
                    'message' => 'Update Status Failed!'
                ],400);
            }
        }else{
            try{
                $a = DB::table('weekly_class')
                                ->where('minggukelas_id',$request->id)
                                ->update(['status_kelas' => 'Open']);

                return response()->json([
                            'success' => true,
                            'message' => 'Update Status Success!',
                        ], 200);
            }catch(Exception $e){
                return response()->json([
                    'success' => false,
                    'message' => 'Update Status Failed!'
                ],400);
            }
        }
    }

    //get kelas for mhs
    public function getKelasMhs (){
        $kelas = DB::table('kelas')
                    ->join('mata_kuliah','kelas.matkul_id','=','mata_kuliah.matkul_id')
                    ->join('dosen','mata_kuliah.dosen_id','=','dosen.dosen_id')
                    // ->join('weekly_class','kelas.kelas_id','weekly_class.kelas_id')
                    // ->where('weekly_class.status_kelas','=','Open')
                    ->select('mata_kuliah.matkul_name as course_name','dosen.dosen_name as lecturer_name','kelas.*')
                    ->where('kelas.status','aktif')
                    ->get();

        // $kelas = DB::table('kelas as k')
        //             ->join('mata_kuliah as mk','k.matkul_id','=','mk.matkul_id')
        //             ->join('dosen as d','mk.dosen_id','=','d.dosen_id')


        return response()->json([
            'success' => true,
            'message' => 'Retrieve Kelas Success',
            'kelas' => $kelas,
        ], 200);
    }

    //cek kelas
    public function cekKelas (Request $request){
        $kelas = DB::table('kelas')
                    ->select('password_kelas as password')
                    // ->where('status_kelas','=','Open')
                    ->where('kelas_id',$request->id)
                    ->first();

        return response()->json([
            'success' => true,
            'message' => 'Retrieve Kelas Success',
            'kelas' => $kelas,
        ], 200);
    }

    //show kelas based on minggu
    public function cekKelasMinggu (Request $request){
        $kelas = DB::table('weekly_class')
                    ->join('kelas','weekly_class.kelas_id','=','kelas.kelas_id')
                    ->select('kelas.*')
                    ->where('weekly_class.minggukelas_id',$request->weekid)
                    ->first();

        return response()->json([
            'success' => true,
            'message' => 'Retrieve Kelas Success',
            'kelas' => $kelas,
        ], 200);
    }

    //set enroll history
    public function setEnroll (Request $request){
        $enroll = DB::table('enroll_history')->insert([
            'kelas_id' => $request->kelas_id,
            'mahasiswa_id' => $request->mahasiswa_id,
            'enroll_code' => $request->enroll_code,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Success!',
        ], 200);
    }

    //validate enroll
    public function validateEnroll (Request $request){
        $enroll = DB::table('enroll_history')
                        ->select('enroll_history_id')
                        ->where('kelas_id',$request->kelas_id)
                        ->where('mahasiswa_id',$request->mahasiswa_id)
                        ->where('enroll_code',$request->enroll_code)
                        ->get();
        
        if(count($enroll)>0){
            return response()->json([
                'message' => $enroll,
            ]);
        }else{
            return response()->json([
                'message' => null,
            ]);
        }
    }

    //get enroll history
    public function getEnrollHistory (Request $request){
        $enroll = DB::table('enroll_history')
                        // ->join('mahasiswa as m','eh.mahasiswa_id','=','m.mahasiswa_id')
                        ->select('kelas_id')
                        ->where('mahasiswa_id',$request->id)
                        ->get();

        if(count($enroll)>0){
            $enroll_history = DB::table('kelas as k')
                                ->join('enroll_history as eh','k.kelas_id','=','eh.kelas_id')
                                ->select('k.*')
                                ->where('eh.mahasiswa_id',$request->id)
                                ->get();

            return response()->json([
                'enroll' => $enroll_history,
            ]);
        }else{
            return response()->json([
                'enroll' => null
            ]);
        }
    }

    //get student class detail
    public function studentClassDetail( Request $request ){
        $kelas = DB::table('kelas as k')
                    // ->join('weekly_class as wk','k.kelas_id','=','wk.kelas_id')
                    ->join('mata_kuliah as mk','k.matkul_id','=','mk.matkul_id')
                    ->join('dosen as d','mk.dosen_id','=','d.dosen_id')
                    ->select('k.kelas_name','mk.matkul_name','d.dosen_name')
                    ->where('k.kelas_id',$request->id)
                    ->first();

        $week =  DB::table('weekly_class')
                    ->select('*')
                    ->where('kelas_id',$request->id)
                    ->where('status_kelas','Open')
                    ->get();

        return response()->json([
            'success' => true,
            'message' => 'Success!',
            'kelas' => $kelas,
            'week' => $week,
        ], 200);
    }

    public function destroy(Request $request){
        try{
            DB::table('kelas')
                ->where('kelas_id',$request->id)
                ->update([
                    'status'=>'nonaktif',
                ]);

            // DB::table('users')->where('mahasiswa_id',$request->id)->delete();

            return response() -> json([
                'success' => true,
                'message' => `Kelas Deleted!`
            ],200);
        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Delete Kelas Failed!'
            ]);
        }
    }
}
