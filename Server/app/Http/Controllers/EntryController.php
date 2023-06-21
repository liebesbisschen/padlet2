<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EntryController extends Controller
{
    public function index():JsonResponse{
        $entries = Entry::with(['comments','user', 'ratings'])->get();
        return response()->json($entries, 200);
    }

    //Find all entries from one padlet with padletid
    public function findByPadletID (string $padlet_id) : JsonResponse{
        $entry = Entry::where([['padlet_id', $padlet_id]])
            ->with(['comments','user', 'ratings'])->first();
        return $entry != null ? response()->json($entry, 200) : response()->json(null, 200);
    }

    //find specific entry by id
    public function findByEntryID (string $entry_id) : JsonResponse{
        $entry = Entry::where([['id', $entry_id]])
            ->with(['comments','user', 'ratings'])->first();
        return $entry != null ? response()->json($entry, 200) : response()->json(null, 200);
    }

    //save an entry to padlet
    public function save(Request $request, string $padletID):JsonResponse{
        $request = $this->parseRequest($request);
        DB::beginTransaction();

        try{
            if(isset($request['user_id']) && isset($request['title']) &&isset($request['content']));
            {
                $entry = Entry::create(
                    [
                        'user_id'=>$request['user_id'],
                        'title'=>$request['title'],
                        'content'=> $request['content'],
                        'padlet_id'=> $padletID
                    ]
                );
            }
            DB::commit();
            return response()->json($entry,200);
        }
        catch(\Exception $e) {
            DB::rollBack();
            return response()->json("saving entry failed: " . $e->getMessage(),420);
        }
    }

    //delete Entry
    public function delete(string $id): JsonResponse
    {
        $entry = Entry::where('id', $id)->first();
        if ($entry != null) {
            $entry->delete();
            return response()->json('entry (' . $id . ') successfully deleted', 200);
        } else
            return response()->json('entry could not be deleted - it does not exist', 422);
    }

    // update Entry
    public function update(Request $request, string $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $entry = Entry::with(['comments','user', 'ratings'])
                ->where('id', $id)->first();
            if ($entry != null) {
                $request = $this->parseRequest($request);
                $entry->update($request->all());


                if (isset($request['entries']) && is_array($request['entries'])) {
                    foreach ($request['entries'] as $e) {
                        $entry = Entry::firstOrNew(['title' => $e['title'], 'content' => $e['content'], 'user_id' => $e['user_id'], 'padlet_id'=>$id]);
                        $entry->entries()->save($entry);
                    }
                }
                $entry->save();
            }
            DB::commit();
            $entry1 = Entry::with(['comments','user', 'ratings'])
                ->where('id', $id)->first(); // return a vaild http response
            return response()->json($entry1, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating Entry failed: " . $e->getMessage(), 420);
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
