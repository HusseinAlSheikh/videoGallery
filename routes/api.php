<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
          return $request->user();
    });
    //----
    Route::resource('/user/videos', VideoController::class)->except(['create','edit']);
});


Route::post('/login',[UserController::class,'loginUser']);
Route::post('/signup',[UserController::class,'createUser']);

Route::get('/public-videos' , [VideoController::class,'getLatestPublicVideos']);

