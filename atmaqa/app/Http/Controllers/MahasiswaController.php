<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Exception;


class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $mahasiswa = Mahasiswa::all()->where('status','aktif');

        $mahasiswa = DB::table('mahasiswa')
                            ->select('*')
                            ->where('status','aktif')
                            ->get();

        if(count($mahasiswa)>0) {
            return response()->json([
                'success' => true,
                'message' => 'Retrieve All Success',
                'mahasiswa' => $mahasiswa
            ], 200);
        }

        return response()->json([
            'message' => 'Retrieve All Empty',
            'mahasiswa' => null
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
            'npm' => ['required'],
            'email' => ['required'],
            'password' => ['required'],
        ]);

        $mahasiswa = new Mahasiswa();
        $mahasiswa->mahasiswa_name = $request["name"];
        $mahasiswa->npm = $request["npm"];
        $mahasiswa->email_mahasiswa = $request["email"];
        $mahasiswa->status_mahasiswa = 0;
        $mahasiswa->password_mahasiswa = Hash::make($request["password"]); //cek nanti
        $mahasiswa->status = 'aktif';

        if ($mahasiswa->save()) {
            $user = new User();
            $user->email = $mahasiswa->email_mahasiswa;
            $user->password = $mahasiswa->password_mahasiswa;
            $user->dosen_id = null;
            $user->mahasiswa_id = $mahasiswa->mahasiswa_id;
            $user->status = $mahasiswa->status;

            if ($user->save()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Add Mahasiswa Success!',
                    'mahasiswa' => $mahasiswa,
                    'user' => $user,
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Add Mahasiswa Failed!',
                    'user' => $user,
                ], 400);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Add Mahasiswa Failed!',
                'mahasiswa' => $mahasiswa,
            ], 400);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dosen  $dosen
     * @return \Illuminate\Http\Response
     */
    public function show(Mahasiswa $mahasiswa)
    {
        return response()->json([
            'success' => true,
            'message' => 'Retrieve Mahasiswa Success',
            'mahasiswa' => $mahasiswa
        ], 200);
    }


    //search
    public function search(Request $request)
    {
        try{
            $mahasiswa = DB::table('mahasiswa')
                                ->select(
                                    'mahasiswa_id',
                                    'mahasiswa_name',
                                    'npm'
                                )
                                ->where('npm', 'LIKE', "$request->npm%")
                                ->get();

            if(count($mahasiswa)>0){
                return response()->json([
                    'success' => true,
                    'message' => 'Retrieve Mahasiswa Success!',
                    'mahasiswa' => $mahasiswa,
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => 'Retrieve Mahasiswa Empty!',
                'mahasiswa' => null,
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
    public function update(Request $request, Mahasiswa $mahasiswa)
    {
        $request->validate([
            'name' => ['required'],
            'npm' => ['required'],
            'email' => ['required'],
            // 'password' => ['required'],
        ]);

        if($request['password'] === $mahasiswa->password_mahasiswa){
            $mahasiswa->mahasiswa_name = $request["name"];
            $mahasiswa->npm = $request["npm"];
            $mahasiswa->email_mahasiswa = $request["email"];
            $mahasiswa->password_mahasiswa = $mahasiswa->password_mahasiswa;
            
            if ($mahasiswa->save()) {
                $user = $mahasiswa->user;
                $user->email = $mahasiswa->email_mahasiswa;
                $user->password = $mahasiswa->password_mahasiswa;
                $user->dosen_id = null;
                $user->mahasiswa_id = $mahasiswa->mahasiswa_id;
    
                if ($user->save()) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Update Mahasiswa Success!',
                        'mahasiswa' => $mahasiswa,
                        'user' => $user,
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Update Mahasiswa Failed!',
                        'user' => $user,
                    ], 400);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Update Mahasiswa Failed!',
                    // 'mahasiswa' => $mahasiswa,
                ], 400);
            }
        } else {
            $mahasiswa->mahasiswa_name = $request["name"];
            $mahasiswa->npm = $request["npm"];
            $mahasiswa->email_mahasiswa = $request["email"];
            $mahasiswa->password_mahasiswa = Hash::make($request["password"]);

            if ($mahasiswa->save()) {
                $user = $mahasiswa->user;
                $user->email = $mahasiswa->email_mahasiswa;
                $user->password = $mahasiswa->password_mahasiswa;
                $user->dosen_id = null;
                $user->mahasiswa_id = $mahasiswa->mahasiswa_id;
    
                if ($user->save()) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Update Mahasiswa Success!',
                        'mahasiswa' => $mahasiswa,
                        'user' => $user,
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Update Mahasiswa Failed!',
                        'user' => $user,
                    ], 400);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Update Mahasiswa Failed!',
                    // 'mahasiswa' => $mahasiswa,
                ], 400);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dosen  $dosen
     * @return \Illuminate\Http\Response
     */
    public function destroy(Mahasiswa $mahasiswa, Request $request)
    {
        try{
            DB::table('mahasiswa')
                ->where('mahasiswa_id',$request->id)
                ->update([
                    'status'=>'nonaktif',
                ]);

            // DB::table('users')->where('mahasiswa_id',$request->id)->delete();

            return response() -> json([
                'success' => true,
                'message' => `Mahasiswa Deleted!`
            ],200);
        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Delete Mahasiswa Failed!'
            ]);
        }
    }

    //change status
    public function changeStatsMhs(Request $request){
        try{
            $cek = DB::table('mahasiswa')
                        ->select('status_mahasiswa')
                        ->where('mahasiswa_id',$request->id)
                        ->first();

                        // return response() -> json([
                        //     'success' => true,
                        //     'message' => $cek->status_mahasiswa
                        // ],200);            

            if($cek->status_mahasiswa === "1"){
                DB::table('mahasiswa')
                    ->where('mahasiswa_id',$request->id)
                    ->update([
                        'status_mahasiswa'=>"0",
                    ]);
    
                // DB::table('users')->where('mahasiswa_id',$request->id)->delete();
    
                return response() -> json([
                    'success' => true,
                    'message' => `Status Changed!`
                ],200);
            }else{
                DB::table('mahasiswa')
                    ->where('mahasiswa_id',$request->id)
                    ->update([
                        'status_mahasiswa'=>"1",
                    ]);
    
                // DB::table('users')->where('mahasiswa_id',$request->id)->delete();
    
                return response() -> json([
                    'success' => true,
                    // 'a' => 'a',
                    'message' => `Status Changed!`,
                ],200);
            }

        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Status Change Failed!'
            ]);
        }
    }
}
