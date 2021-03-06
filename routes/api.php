<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('question', App\Http\Controllers\QuestionController::class);
Route::resource('quest', App\Http\Controllers\QuestController::class);
Route::resource('game', App\Http\Controllers\GameController::class);
Route::post('game/find', [App\Http\Controllers\GameController::class, 'find']);
Route::post('game/answer', [App\Http\Controllers\GameController::class, 'answer']);
