<?php

namespace App\Http\Controllers;

use App\Models\PertanyaanMHS;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PertanyaanMHSController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $question = PertanyaanMHS::all();

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

    public function indexPinned(Request $request){
        $question = DB::table('pertanyaan_mahasiswa as pm')
                        ->join('mahasiswa as m','pm.mahasiswa_id','=','m.mahasiswa_id')
                        // ->join('weekly_class','pertanyaan_mahasiswa.minggukelas_id','=','weekly_class.minggukelas_id')
                        ->select('pm.*','pm.pertanyaan_mhs as question','m.npm','m.status_mahasiswa')
                        ->where('pm.minggukelas_id',$request->minggukelas_id)
                        ->where('pm.status_pertanyaan','shown')
                        ->where('pm.status','aktif')
                        ->get();

        if(count($question)>0) {
            return response()->json([
                'success' => true,
                'message' => 'Retrieve All Success',
                'question' => $question
            ], 200);
        }else{
            return response()->json([
                'message' => 'Retrieve All Empty',
                'question' => null
            ], 204);
        }

    }

    public function indexPertanyaanMhsByDosen (Request $request){
        $question = DB::table('pertanyaan_mahasiswa as pm')
                        ->join('mahasiswa as m','pm.mahasiswa_id','=','m.mahasiswa_id')
                        // ->join('weekly_class','pertanyaan_mahasiswa.minggukelas_id','=','weekly_class.minggukelas_id')
                        ->select('pm.*','pm.pertanyaan_mhs as question', 'm.npm')
                        ->where('pm.minggukelas_id',$request->minggukelas_id)
                        ->where('pm.status','aktif')
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
        $request->validate([
            'pertanyaan' => ['required'],
        ]);
        $question = new PertanyaanMHS();
        $question->pertanyaan_mhs = $request["pertanyaan"];
        $question->mahasiswa_id = $request['mahasiswa_id'];
        $question->minggukelas_id = $request['minggukelas_id'];
        $question->status = 'aktif';

        if ($question->save()) {
            return response()->json([
                'success' => true,
                'message' => 'Add Question Success!',
                'question' => $question,
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Add Question Failed!',
                'question' => $question,
            ], 400);
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
        $question = DB::table('pertanyaan_mahasiswa as pm')
                        ->join('mahasiswa as m','pm.mahasiswa_id','=','m.mahasiswa_id')
                        // ->join('weekly_class','pertanyaan_mahasiswa.minggukelas_id','=','weekly_class.minggukelas_id')
                        ->select('pm.*','pm.pertanyaan_mhs as question', 'm.npm','m.status_mahasiswa')
                        ->where('pm.pertanyaanmhs_id', $request->pertanyaanmhs_id)
                        ->first();
        
        $oneQuestion = DB::table('pertanyaan_mahasiswa')
                            ->select('pertanyaan_mhs')
                            ->where('pertanyaanmhs_id',$request->pertanyaanmhs_id)
                            ->first();

        return response()->json([
            'success' => true,
            'message' => 'Retrieve Question Success',
            'question' => $question,
            'oneQuestion' => $oneQuestion,
        ], 200);
    }

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
    public function edit($id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'pertanyaan' => ['required'],
        ]);

        try{
            $question = DB::table('pertanyaan_mahasiswa')
                            ->where('pertanyaanmhs_id',$id)
                            ->update(['pertanyaan_mhs' => $request['pertanyaan']]);
            
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

    public function setShown(Request $request){
        try{
            $question = DB::table('pertanyaan_mahasiswa')
                            ->select('status_pertanyaan')
                            ->where('pertanyaanmhs_id',$request->id)
                            ->first();

            // dd($question);
            // return response()->json([
            //     'a' => $question['status_pertanyaan'],
            // ]);

            if($question->status_pertanyaan == 'not shown'){
                DB::table('pertanyaan_mahasiswa')
                    ->where('pertanyaanmhs_id',$request->id)
                    ->update([
                        'status_pertanyaan' => 'shown'
                    ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Update Question Success!',
                ], 200);
            }else{
                DB::table('pertanyaan_mahasiswa')
                    ->where('pertanyaanmhs_id',$request->id)
                    ->update([
                        'status_pertanyaan' => 'not shown'
                    ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Update Question Success!',
                ], 200);
            }
            
            
        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Update Question Failed!'
            ],400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    //delete
    public function delete(Request $request)
    {
        try{
            DB::table('pertanyaan_mahasiswa')->where('pertanyaanmhs_id',$request->id)->delete();
            return response() -> json([
                'success' => true,
                'message' => `Question Deleted!`
            ],200);
        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Delete Question Failed!'
            ]);
        }
    }

    public function answerQuestionMhs(Request $request){
        $request->validate([
            'jawaban' => ['required'],
        ]);

        try{
            $question = DB::table('pertanyaan_mahasiswa')
                            ->where('pertanyaanmhs_id',$request->id)
                            ->update(['jawaban_dosen' => $request['jawaban']]);
            
            return response()->json([
                        'success' => true,
                        'message' => 'Success!',
                    ], 200);
        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ],400);
        }
    }
}
