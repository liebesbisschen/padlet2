<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    //Find comment with entrie_id
    public function findCommentsByEntryID(string $entry_id):JsonResponse{
        $comment = Comment::where('entry_id', $entry_id)
            ->with(['user', 'entry'])->get();
        return $comment != null ? response()->json($comment, 200) : response()->json(null, 200);
    }

    //create Comment
    public function saveComment(Request $request, string $entryID): JsonResponse
    {
        $request = $this->parseRequest($request);
        DB::beginTransaction();

        try {
            if(isset($request['user_id']) &&isset($request['comment']));
            {
                $comment = Comment::create(
                    [
                        'user_id'=>$request['user_id'],
                        'comment'=>$request['comment'],
                        'entry_id'=> $entryID
                    ]
                );
            }
            DB::commit();
            // return a vaild http response
            return response()->json($comment, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving comment failed: " . $e->getMessage(), 420);
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
