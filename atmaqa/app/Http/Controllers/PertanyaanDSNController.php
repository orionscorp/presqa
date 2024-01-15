<?php

namespace App\Http\Controllers;

use App\Models\PertanyaanDSN;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PertanyaanDSNController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $question = PertanyaanDSN::all();

        if(count($question)>0) {
            return response()->json([
                'success' => true,
                'message' => 'Retrieve All Success',
                'question' => $question
            ], 200);
        }

        return response()->json([
            'message' => 'Retrieve All Empty',
            'question' => null
        ], 204);
    }

    public function indexPertanyaanMhs(Request $request){
        $question = DB::table('pertanyaan_mahasiswa')
                        // ->join('mahasiswa','pertanyaan_mahasiswa.mahasiswa_id','=','mahasiswa.mahasiswa_id')
                        // ->join('weekly_class','pertanyaan_mahasiswa.minggukelas_id','=','weekly_class.minggukelas_id')
                        ->select('pertanyaan_mahasiswa.*','pertanyaan_mhs as question')
                        ->where('mahasiswa_id',$request->mahasiswa_id)
                        ->where('minggukelas_id',$request->minggukelas_id)
                        ->get();

        if(count($question)>0) {
            return response()->json([
                'success' => true,
                'message' => 'Retrieve All Success',
                'question' => $question
            ], 200);
        }

        return response()->json([
            'message' => 'Retrieve All Empty',
            'question' => null
        ], 204);
    }

    public function indexPertanyaanDosen (Request $request){
        $question = DB::table('pertanyaan_dosen')
                        ->select('*')
                        ->where('minggukelas_id',$request->id)
                        ->where('status','aktif')
                        ->get();

        if(count($question)>0) {
            return response()->json([
                'success' => true,
                'message' => 'Retrieve All Success',
                'question' => $question
            ], 200);
        }

        return response()->json([
            'message' => 'Retrieve All Empty',
            'question' => null
        ], 204);
    }

    public function getPertanyaanDsn (Request $request){
        $question = DB::table('pertanyaan_dosen')
                        ->select('*')
                        ->where('pertanyaandsn_id',$request->id)
                        ->where('status','aktif')
                        ->get();

        if(count($question)>0) {
            return response()->json([
                'success' => true,
                'message' => 'Retrieve All Success',
                'question' => $question
            ], 200);
        }

        return response()->json([
            'message' => 'Retrieve All Empty',
            'question' => null
        ], 204);
    }

    public function validatePertanyaanDsn(Request $request){
        $question = DB::table('pertanyaan_dosen')
                        ->select('pertanyaandsn_id')
                        ->where('minggukelas_id', $request->id)
                        ->get();

        if(count($question)>0){
            return response()->json([
                'success' => true,
                'message' => 'Retrieve All Success',
                'question' => $question
            ], 200);
        }

        return response()->json([
            'message' => 'Retrieve All Empty',
            'question' => null
        ], 204);
    }

    public function soal(Request $request){
        try{
            $question = DB::table('pertanyaan_dosen as pd')
            ->select('pd.pertanyaandsn_id','pd.pertanyaan_dosen','pd.pilihanA','pd.pilihanB','pd.pilihanC')
            ->where('pd.minggukelas_id',$request->id)
            ->where('status','aktif')
            ->get();

            $jumlah = count($question);

            if(count($question) > 0)
            {
                return response()->json([
                    'success' => true,
                    'question' => $question,
                    'jumlah' => $jumlah
                ]);
            }else{
                return response()->json([
                    'success' => true,
                    'question' => null,
                ]);
            }

        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message'=>$e->getMessage()
            ], 401);
        }
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //  
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'pertanyaan' => ['required'],
            ]);
            
            $list_pertanyaan = json_decode($request['pertanyaan'],true);

            foreach ($list_pertanyaan as $pertanyaan){
                $question = DB::table('pertanyaan_dosen')
                            ->insert([
                                'pertanyaan_dosen' => $pertanyaan['question'],
                                'pilihanA' => null,
                                'pilihanB' => null,
                                'pilihanC' => null,
                                'jawaban_benar' => null,
                                'minggukelas_id' => $request->id,
                                'status' => 'aktif',
                            ]);           
            }

            return response()->json([
                'success' => true,
                'Message' => 'Success!',
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message'=>$e->getMessage()
            ], 401);
        }
    }

    public function storeMulti(Request $request)
    {
        try{
            $request->validate([
                'pertanyaan' => ['required'],
            ]);
            
            $list_pertanyaan = json_decode($request['pertanyaan'],true);

            foreach ($list_pertanyaan as $pertanyaan){
                // var_dump($pertanyaan);
                $question = DB::table('pertanyaan_dosen')
                            ->insert([
                                'pertanyaan_dosen' => $pertanyaan['question'],
                                'pilihanA' => $pertanyaan['option_A'],
                                'pilihanB' => $pertanyaan['option_B'],
                                'pilihanC' => $pertanyaan['option_C'],
                                'jawaban_benar' => $pertanyaan['correct'],
                                'minggukelas_id' => $request->id,
                                'status' => 'aktif',
                            ]);           
            }

            return response()->json([
                'success' => true,
                'Message' => 'Success!',
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message'=>$e->getMessage()
            ], 401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $question = DB::table('pertanyaan_dosen')
                        ->select('*')
                        ->where('minggukelas_id',$request->id)
                        ->where('status','aktif')
                        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Retrieve Question Success',
            'question' => $question,
        ], 200);
    }

    public function showMhs(Request $request){
        // $mhs = DB::table('mahasiswa as m')
        //         ->join('jawaban_mhs as jm','m.mahasiswa_id','=','jm.mahasiswa_id')
        //         ->join('pertanyaan_dosen as pd','jm.pertanyaandsn_id','=','pd.pertanyaandsn_id')
        //         ->select('m.npm')
        //         ->where('pd.minggukelas_id', $request->id)
        //         ->get();

        $mhs = DB::table('mahasiswa as m')
                    ->join('enroll_history as eh','eh.mahasiswa_id','=','m.mahasiswa_id')
                    ->join('kelas as k','k.kelas_id','=','eh.kelas_id')
                    ->join('weekly_class as wc','k.kelas_id','=','wc.kelas_id')
                    ->select('m.npm','m.mahasiswa_id')
                    ->where('wc.minggukelas_id',$request->id)
                    ->get();


        return response()->json([
            'mhs' => $mhs,
            'success' => true,
        ]);
    }

    //cek tipe soal
    public function cekTipeSoal (Request $request){
        $soal = DB::table('pertanyaan_dosen')
                    ->select('pilihanA')
                    ->where('minggukelas_id', $request->id)
                    ->first();

        if($soal->pilihanA == null){
            return response()->json([
                'tipe' => 'Essay'
            ]);
        }else{
            return response()->json([
                'tipe' => 'Multiple Choice'
            ]);
        }
    }

    // public function showJawabanMhs(Request $request){
    //     $jawaban =
    // }

    //search
    public function search(Request $request)
    {
        try{
            $question = DB::table('pertanyaan_mahasiswa')
                        ->select('pertanyaan_mhs as question')
                        ->where('pertanyaan_mhs', 'LIKE', "$request->name%")
                        ->get();

            if(count($question)>0){
                return response()->json([
                    'success' => true,
                    'message' => 'Retrieve Question Success!',
                    'question' => $question,
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => 'Retrieve Question Empty!',
                'question' => null,
            ],200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message'=>$e->getMessage()
            ], 401);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        try{
            $question = DB::table('pertanyaan_dosen')
                            ->where('pertanyaandsn_id',$request->id)
                            ->update([
                                'pertanyaan_dosen' => $request['pertanyaan'],
                                'pilihanA' => $request['pilihanA'],
                                'pilihanB' => $request['pilihanB'],
                                'pilihanC' => $request['pilihanC'],
                                'jawaban_benar' => $request['correct'],
                            ]);
            
            return response()->json([
                        'success' => true,
                        'message' => 'Update Question Success!',
                    ], 200);
        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Update Question Failed!'
            ],400);
        }
    }

}
