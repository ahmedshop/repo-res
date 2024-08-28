<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuItemController;


// web
Route::get('/', function () {
    return view('welcome');
});

// menu
Route::apiResource('/menu-items', MenuItemController::class);