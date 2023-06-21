<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\EntryController;
use App\Http\Controllers\PadletController;
use App\Http\Controllers\RatingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/login', [AuthController::class, 'login']);

//Routes Padlet
Route::get('/padlets', [PadletController::class, 'index']);
Route::get('padlets/{id}', [PadletController::class, 'findByID']);
Route::get('padlets/checkid/{id}', [PadletController::class, 'checkID']);
Route::get('padlets/search/{searchTerm}', [PadletController::class, 'findBySearchTerm']);

//ohne gültigen Token, können die Routen nicht mehr aufgerufen werden
Route::group(['middleware' => ['api', 'auth.jwt', 'auth.admin']], function () {
    Route::post('padlets', [PadletController::class, 'save']);
    Route::put('padlets/{id}', [PadletController::class, 'update']);
    Route::delete('/padlets/{id}', [PadletController::class, 'delete']);
    Route::post('auth/logout', [AuthController::class, 'logout']);


//Routes Entries
    Route::get('entries', [EntryController::class, 'index']);
    Route::get('padlets/{padlet_id}/entries', [EntryController::class, 'findByPadletID']);
    Route::get('padlets/{id}/entries/{id}', [EntryController::class, 'findByEntryID']);
    Route::post('padlets/{id}/entries', [EntryController::class, 'save']);
    Route::delete('/entries/{id}', [EntryController::class, 'delete']);
    Route::put('padlets/{id}/entries/{id}', [EntryController::class, 'update']);

//Routes Comments
    Route::get('entries/{id}/comments', [CommentController::class, 'findCommentsByEntryID']);
    Route::post('entries/{id}/comments', [CommentController::class, 'saveComment']);

//Routes Ratings
    Route::get('entries/{id}/ratings', [RatingController::class, 'findByEntryID']);
    Route::post('entries/{id}/ratings', [RatingController::class, 'saveRating']);
});
