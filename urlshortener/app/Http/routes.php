<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use App\Url;

Route::get('/', function () {
    return view('urlshortener');
});
Route::get('/invalid', function () {
    return view('invalidurl');
});
Route::post('/', 'UrlController@shorten');
Route::get('{code}','UrlController@redirect');
