<?php

namespace Database\Seeders;

use App\Models\Right;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RightsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //add userright
        $userrights = new Right();
        $userrights->user_id = 1;
        $userrights->padlet_id = 1;
        $userrights->read = true;
        $userrights->edit = true;
        $userrights->delete = true;
        $userrights->save();
    }
}
