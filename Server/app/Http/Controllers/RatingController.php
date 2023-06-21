<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Rating;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RatingController extends Controller
{
    //Find rating with entrie_id
    public function findByEntryID(string $entry_id):JsonResponse{
        $rating = Rating::where('entry_id', $entry_id)
            ->with(['user', 'entry'])->get();
        return $rating != null ? response()->json($rating, 200) : response()->json(null, 200);
    }

    // saves rating
    public function saveRating(Request $request, string $entryID): JsonResponse
    {
        $request = $this->parseRequest($request);
        DB::beginTransaction();

        try {
            if(isset($request['user_id']) &&isset($request['rating']));
            {
                $rating = Rating::create(
                    [
                        'user_id'=>$request['user_id'],
                        'rating'=>$request['rating'],
                        'entry_id'=> $entryID
                    ]
                );
            }
            DB::commit();
            // return a vaild http response
            return response()->json($rating, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving rating failed: " . $e->getMessage(), 420);
        }
    }


    private function parseRequest(Request $request): Request
    {
        //convert date
        $date = new \DateTime($request->created_at);
        $request['published'] = $date;
        return $request;
    }

}
