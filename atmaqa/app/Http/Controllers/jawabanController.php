<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class jawabanController extends Controller
{
    // ...

    // Action to add answers to questions
    public function addJawaban(Request $request)
    {
        try {
            // Validate the request to ensure the 'jawaban' field is required
            $request->validate([
                'jawaban' => ['required'],
            ]);

            // Decode the JSON data in the 'jawaban' field into an array
            $list_jawaban = json_decode($request['jawaban'], true);

            foreach ($list_jawaban as $jawaban) {
                // Check if 'pilihanA' in the answer is null
                if ($jawaban["pilihanA"] == null) {
                    // Insert student's answer into the 'jawaban_mhs' table
                    DB::table('jawaban_mhs')
                        ->insert([
                            'pertanyaandsn_id' => $jawaban["id"],
                            'mahasiswa_id' => $request->id,
                            'jawaban' => $jawaban["jawaban"],
                        ]);
                } else {
                    // Check if the student's answer matches the correct answer
                    $cekJawaban = DB::table('pertanyaan_dosen')
                        ->select('jawaban_benar')
                        ->where('pertanyaandsn_id', $jawaban["id"])
                        ->first();

                    if ($cekJawaban->jawaban_benar == $jawaban["jawaban"]) {
                        // If the answer is correct, insert it with a score of 100
                        DB::table('jawaban_mhs')
                            ->insert([
                                'pertanyaandsn_id' => $jawaban["id"],
                                'mahasiswa_id' => $request->id,
                                'jawaban' => $jawaban["jawaban"],
                                'score' => 100,
                            ]);
                    } else {
                        // If the answer is incorrect, insert it with a score of 0
                        DB::table('jawaban_mhs')
                            ->insert([
                                'pertanyaandsn_id' => $jawaban["id"],
                                'mahasiswa_id' => $request->id,
                                'jawaban' => $jawaban["jawaban"],
                                'score' => 0,
                            ]);
                    }
                }
            }

            // Return a JSON response indicating success
            return response()->json([
                'success' => true,
                'Message' => 'Success!',
            ]);
        } catch (Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 401);
        }
    }

    // Action to check if a student has answered questions for a specific class
    public function pernahJawab(Request $request)
    {
        $cekAns = DB::table('jawaban_mhs as jm')
            ->join('pertanyaan_dosen as pd', 'jm.pertanyaandsn_id', '=', 'pd.pertanyaandsn_id')
            ->select('jm.pertanyaandsn_id', 'jm.mahasiswa_id')
            ->where('pd.minggukelas_id', $request->id)
            ->where('jm.mahasiswa_id', $request->mid)
            ->count();

        if ($cekAns > 0) {
            return response()->json([
                'success' => false
            ]);
        } else {
            return response()->json([
                'success' => true
            ]);
        }
    }

    // Action to check if a student has answered questions for a specific class (similar to pernahJawab)
    public function cekPernahJawab(Request $request)
    {
        $cekAns = DB::table('jawaban_mhs as jm')
            ->join('pertanyaan_dosen as pd', 'jm.pertanyaandsn_id', '=', 'pd.pertanyaandsn_id')
            ->select('jm.pertanyaandsn_id', 'jm.mahasiswa_id')
            ->where('pd.minggukelas_id', $request->id)
            ->count();

        if ($cekAns > 0) {
            return response()->json([
                'success' => false
            ]);
        } else {
            return response()->json([
                'success' => true
            ]);
        }
    }

    // Action to calculate the score and retrieve answers for a specific class and student
    public function nilaiJawaban(Request $request)
    {
        // Calculate the count of records for the specified class and student
        $nilai = DB::table('jawaban_mhs as jm')
            ->join('pertanyaan_dosen as pd', 'jm.pertanyaandsn_id', '=', 'pd.pertanyaandsn_id')
            ->select('jm.*', 'pd.*')
            ->where('pd.minggukelas_id', $request->id)
            ->where('jm.mahasiswa_id', $request->mid)
            ->count();

        // Calculate the sum of scores (excluding scores equal to 0) for the specified class and student
        $sumNilai = DB::table('jawaban_mhs as jm')
            ->join('pertanyaan_dosen as pd', 'jm.pertanyaandsn_id', '=', 'pd.pertanyaandsn_id')
            ->where('pd.minggukelas_id', $request->id)
            ->where('jm.mahasiswa_id', $request->mid)
            ->where('jm.score', '!=', 0)
            ->sum('jm.score');

        if ($nilai > 0) {
            // Retrieve answers and additional information (e.g., student's npm)
            $realnilai = DB::table('jawaban_mhs as jm')
                ->join('pertanyaan_dosen as pd', 'jm.pertanyaandsn_id', '=', 'pd.pertanyaandsn_id')
                ->select('jm.*', 'pd.*')
                ->where('pd.minggukelas_id', $request->id)
                ->where('jm.mahasiswa_id', $request->mid)
                ->get();

            $npm = DB::table('mahasiswa')
                ->select('npm')
                ->where('mahasiswa_id', $request->mid)
                ->first();

            // Calculate the average score ('sum' is the average)
            $sum = $sumNilai / $nilai;

            return response()->json([
                'success' => true,
                'nilai' => $realnilai,
                'sum' => $sum,
                'npm' => $npm,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'nilai' => null,
            ]);
        }
    }

    // Action to update scores and provide feedback for student answers
    public function koreksiJawaban(Request $request)
    {
        try {
            // Validate the request to ensure the 'quiz' field is required
            $request->validate([
                'quiz' => ['required'],
            ]);

            // Decode the JSON data in the 'quiz' field into an array
            $list_quiz = json_decode($request['quiz'], true);

            foreach ($list_quiz as $quiz) {
                // Update the score and feedback for the student's answer
                DB::table('jawaban_mhs')
                    ->where('pertanyaandsn_id', $quiz['id'])
                    ->where('mahasiswa_id', $request->id)
                    ->update([
                        'score' => $quiz['score'],
                        'saran_dosen' => $quiz['saran'],
                    ]);
            }

            // Return a JSON response indicating success
            return response()->json([
                'success' => true,
                'message' => 'Update Score Success!',
            ]);
        } catch (Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 401);
        }
    }

    // ...
}
