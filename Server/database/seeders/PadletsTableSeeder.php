<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Entry;
use App\Models\Padlet;
use App\Models\Rating;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PadletsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //add padlet
        $padlet = new Padlet();
        $padlet->name="Padlet Nummer 1";
        $padlet->is_public=true;
        $padlet->user_id=1;
        $padlet->save();

        //add entries to padlet
        $entry = new Entry();
        $entry->user_id = 1;
        $entry->title = "Entry Nummer 1";
        $entry->content ="Beispieltext";

        $entry1 = new Entry();
        $entry1->user_id = 1;
        $entry1->title = "Entry Nummer 2";
        $entry1->content ="Beispieltext etwas länger";
        $padlet->entries()->saveMany([$entry, $entry1]);
        $padlet->save();


        //add new Padlets
        $padlet2 = new Padlet();
        $padlet2->name="Padlet Nummer 2";
        $padlet2->is_public=true;
        $padlet2->user_id=1;
       $padlet2->save();

        $padlet3 = new Padlet();
        $padlet3->name="Padlet Nummer 3";
        $padlet3->is_public=true;
        $padlet3->user_id=1;
        $padlet3->save();

        //add comments
        $comment = new Comment();
        $comment->user_id = 1;
        $comment->entry_id = 1;
        $comment->comment = "Ich bin ein Kommentar";
        $comment->save();

        //add ratings
        $rating1 = new Rating();
        $rating1->user_id = 1;
        $rating1->entry_id = 1;
        $rating1->rating = 4;
        $rating1->save();

        $entry->comments()->saveMany([$comment]);
        $entry->ratings()->saveMany([$rating1]);
        $entry->save();
    }
}
