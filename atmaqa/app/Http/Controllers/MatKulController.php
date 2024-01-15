<?php

namespace App\Http\Controllers;

use App\Models\MatKul;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class MatKulController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $matkul = MatKul::all();

        $matkul = DB::table('mata_kuliah')
                        ->join('dosen', 'mata_kuliah.dosen_id', '=', 'dosen.dosen_id')
                        ->select('mata_kuliah.matkul_id','mata_kuliah.matkul_name','dosen.dosen_name')
                        ->where('mata_kuliah.status','aktif')
                        ->where('dosen.status','aktif')
                        ->get();

        if(count($matkul)>0) {
            return response()->json([
                'success' => true,
                'message' => 'Retrieve All Success',
                'matkul' => $matkul
            ], 200);
        }

        return response()->json([
            'message' => 'Retrieve All Empty',
            'matkul' => null
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
            'dosen_id' => ['required'],
        ]);

        $matkul = new MatKul();
        $matkul->matkul_name = $request["name"];
        $matkul->dosen_id = $request["dosen_id"];
        $matkul->status = 'aktif';

        if ($matkul->save()) {
            return response()->json([
                'success' => true,
                'message' => 'Add Mata Kuliah Success!',
                'matkul' => $matkul,
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Add Mata Kuliah Failed!',
                'matkul' => $matkul,
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dosen  $dosen
     * @return \Illuminate\Http\Response
     */
    public function show(MatKul $matkul)
    {
        $dosen = DB::table('mata_kuliah')
                    ->join('dosen', 'mata_kuliah.dosen_id', '=', 'dosen.dosen_id')
                    ->select('dosen.dosen_name','dosen.dosen_id')
                    ->where('dosen.dosen_id','LIKE',$matkul->dosen_id)
                    ->first();

        return response()->json([
            'success' => true,
            'message' => 'Retrieve Mata Kuliah Success',
            'matkul' => $matkul,
            'dosen' => $dosen,
        ], 200);
    }

    //search
    public function search(Request $request)
    {
        try{
            $matkul = DB::table('mata_kuliah')
                        ->join('dosen', 'mata_kuliah.dosen_id', '=', 'dosen.dosen_id')
                        ->select('mata_kuliah.matkul_id','mata_kuliah.matkul_name','dosen.dosen_name')
                        ->where('mata_kuliah.matkul_name', 'LIKE', "$request->name%")
                        ->get();

            if(count($matkul)>0){
                return response()->json([
                    'success' => true,
                    'message' => 'Retrieve Course Success!',
                    'matkul' => $matkul,
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => 'Retrieve Course Empty!',
                'matkul' => null,
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
    public function update(Request $request, MatKul $matkul)
    {
        $request->validate([
            'name' => ['required'],
            'dosen_id' => ['required'],
        ]);

        $matkul->matkul_name = $request["name"];
        $matkul->dosen_id = $request["dosen_id"];
        
        if ($matkul->save()) {
            return response()->json([
                'success' => true,
                'message' => 'Update Mata Kuliah Success!',
                'matkul' => $matkul,
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Update Mata Kuliah Failed!',
                'matkul' => $matkul,
            ], 400);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dosen  $dosen
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        try{
            DB::table('mata_kuliah')
                ->where('matkul_id',$request->id)
                ->update([
                    'status'=>'nonaktif',
                ]);

            // DB::table('users')->where('mahasiswa_id',$request->id)->delete();

            return response() -> json([
                'success' => true,
                'message' => `Matkul Deleted!`
            ],200);
        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Delete Matkul Failed!'
            ]);
        }
    }

    //get dosen course
    public function dosenCourse(Request $request){
        $matkul = DB::table('mata_kuliah')
                        ->join('dosen', 'mata_kuliah.dosen_id', '=', 'dosen.dosen_id')
                        ->select('mata_kuliah.matkul_id','mata_kuliah.matkul_name','dosen.dosen_name')
                        ->where('dosen.dosen_id', $request->id)
                        ->get();

        return response()->json([
            'success' => true,
            'message' => 'Retrieve Matkul Success',
            'matkul' => $matkul,
        ], 200);
    }
}
