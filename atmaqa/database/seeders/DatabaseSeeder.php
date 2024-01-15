<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('dosen')->insert(['dosen_id' => 1,'dosen_name' => 'Theo','email_dosen' => 'theo@gmail.com','password_dosen' => 'theo','notelp_dosen' => '0813724472826',]);
        // DB::table('dosen')->insert(['dosen_id' => 2,'dosen_name' => 'Pandu','email_dosen' => 'pandu@gmail.com','password_dosen' => 'pandu','notelp_dosen' => '0813724472826',]);
        // DB::table('dosen')->insert(['dosen_id' => 3,'dosen_name' => 'Stanley','email_dosen' => 'stenli@gmail.com','password_dosen' => 'stanley','notelp_dosen' => '0813724472826',]);
        // DB::table('dosen')->insert(['dosen_id' => 4,'dosen_name' => 'Figo','email_dosen' => 'Figo@gmail.com','password_dosen' => 'figo','notelp_dosen' => '0813724472826',]);
        
        DB::table('mahasiswa')->insert(['mahasiswa_id' => 1,'mahasiswa_name' => 'joko','npm' => '160419078','status_mahasiswa' => 1,'email_mahasiswa' => 'joko@gmail.com','password_mahasiswa' => 'joko',]);
        // DB::table('mahasiswa')->insert(['mahasiswa_id' => 2,'mahasiswa_name' => 'miftah','npm' => '160419028','status_mahasiswa' => 1,'email_mahasiswa' => 'miftah@gmail.com','password_mahasiswa' => 'miftah',]);
        // DB::table('mahasiswa')->insert(['mahasiswa_id' => 3,'mahasiswa_name' => 'susila','npm' => '160419041','status_mahasiswa' => 0,'email_mahasiswa' => 'susila@gmail.com','password_mahasiswa' => 'susila',]);
        
        DB::table('users')->insert(['id' => 1, 'email' => 'theo@gmail.com', 'password' => 'theo', 'dosen_id' => 1, 'mahasiswa_id' => null]);
        DB::table('users')->insert(['id' => 2, 'email' => 'joko@gmail.com', 'password' => 'joko', 'dosen_id' => null, 'mahasiswa_id' => 1]);
        DB::table('users')->insert(['id' => 0, 'email' => 'admin@gmail.com', 'password' => '123', 'dosen_id' => null, 'mahasiswa_id' => null]);
        
        // DB::table('mata_kuliah')->insert(['matkul_id' => 1,'matkul_name' => 'Aljabar','dosen_id'=>1,]);
        // DB::table('mata_kuliah')->insert(['matkul_id' => 2,'matkul_name' => 'P3L','dosen_id'=>2,]);
        // DB::table('mata_kuliah')->insert(['matkul_id' => 3,'matkul_name' => 'Alpro','dosen_id'=>4,]);
        // DB::table('mata_kuliah')->insert(['matkul_id' => 4,'matkul_name' => 'Basis Data','dosen_id'=>2,]);

        // DB::table('kelas')->insert(['kelas_id' => 1,'kelas_name' => 'Alpro 1','hari' => 'senin','sesi' => '1','matkul_id' => 3,]);
        // DB::table('kelas')->insert(['kelas_id' => 2,'kelas_name' => 'Alpro 2','hari' => 'selasa','sesi' => '2','matkul_id' => 3,]);
        // DB::table('kelas')->insert(['kelas_id' => 3,'kelas_name' => 'Alpro 3','hari' => 'rabu','sesi' => '1','matkul_id' => 3,]);


        // DB::table('pertanyaan_mahasiswa')->insert(['pertanyaanmhs_id' => 1,'mahasiswa_id' => 1,'kelas_id' => 1,'pertanyaan_mhs' => 'Apa itu Aljabar?','jawaban_dosen' => '']);
        // DB::table('pertanyaan_mahasiswa')->insert(['pertanyaanmhs_id' => 2,'mahasiswa_id' => 2,'kelas_id' => 1,'pertanyaan_mhs' => 'Apa itu Aljabar']);
        // DB::table('pertanyaan_mahasiswa')->insert(['pertanyaanmhs_id' => 3,'mahasiswa_id' => 3,'kelas_id' => 1,'pertanyaan_mhs' => 'Apa itu Alpro?','jawaban_dosen' => 'mantap nak']);        
        
        // DB::table('pertanyaan_dosen')->insert(['pertanyaandsn_id' => 1,'pertanyaan_dosen' => 'Berapa jumlah mhs kita?','kelas_id' => 1,'pilihanA' => '1','pilihanB' => '2','pilihanC' => '38','jawaban_benar' => 'C',]);
        // DB::table('pertanyaan_dosen')->insert(['pertanyaandsn_id' => 2,'pertanyaan_dosen' => 'Yakin?','kelas_id' => 1,'pilihanA' => 'ya kykny','pilihanB' => 'gak','pilihanC' => 'yakinlahbacot','jawaban_benar' => 'C',]);
        // DB::table('pertanyaan_dosen')->insert(['pertanyaandsn_id' => 3,'pertanyaan_dosen' => 'Berapa jumlah matkul kita?','kelas_id' => 2,'pilihanA' => '1','pilihanB' => '2','pilihanC' => '38','jawaban_benar' => 'B',]);
        
        // DB::table('jawaban_mhs')->insert(['pertanyaandsn_id' => 2, 'mahasiswa_id' => 2, 'jawaban' => 'C',]);
        // DB::table('jawaban_mhs')->insert(['pertanyaandsn_id' => 2, 'mahasiswa_id' => 3, 'jawaban' => 'A',]);
        


        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

    }
}
