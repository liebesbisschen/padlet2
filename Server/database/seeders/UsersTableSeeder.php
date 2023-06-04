<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //User 1 hinzufügen
        $user = new User();
        $user->firstName = 'Katja';
        $user->lastName = 'Mueh';
        $user->email = "katja@test.at";
        $user->password = bcrypt("secret");
        $user->image = "https://images.unsplash.com/photo-1683480678001-d2b60353b0fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80";
        $user->save();

        //User 2 hinzufügen
        $user2 = new User();
        $user2->firstName = 'ben';
        $user2->lastName = 'Lenes';
        $user2->email = "lenes@test.at";
        $user2->password = bcrypt("secret");
        $user2->image = "https://images.unsplash.com/photo-1683480678001-d2b60353b0fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80";
        $user2->save();

        //User 3 hinzufügen
        $user3 = new User();
        $user3->firstName = 'Danae';
        $user3->lastName = 'Hund';
        $user3->email = "hund@test.at";
        $user3->password = bcrypt("secret");
        $user3->image = "https://images.unsplash.com/photo-1683480678001-d2b60353b0fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80";
        $user3->save();
    }
}
