<?php

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/login','App\Http\Controllers\ApiController@login');
Route::post('/register','App\Http\Controllers\ApiController@register');
Route::delete('/logout','App\Http\Controllers\ApiController@logout');
Route::get('/info','App\Http\Controllers\ApiController@getPersonalInfo');
Route::post('/upload','App\Http\Controllers\ApiController@uploadPhoto');


Route::group(['middleware' => ['auth:sanctum']],function(){

    Route::get('/allposts','App\Http\Controllers\PostController@getAllPosts');
    Route::get('/userposts','App\Http\Controllers\PostController@getUserPosts');
    Route::post('/create','App\Http\Controllers\PostController@createPost');
    Route::get('/edit/{post_id}','App\Http\Controllers\PostController@editPost');
    Route::post('/update/{post_id}','App\Http\Controllers\PostController@updatePost');
    Route::delete('/delete/{post_id}','App\Http\Controllers\PostController@deletePost');

});
