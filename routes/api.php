<?php

use App\Http\Controllers\EntranceBuilderController;
use App\Http\Controllers\EntranceController;
use App\Http\Controllers\FloorController;
use App\Http\Controllers\HouseBuilderController;
use App\Http\Controllers\HouseController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('houses', HouseController::class);
Route::prefix('houses')->group(function () {
    Route::prefix('{id}')->group(function () {
        Route::post('entrance', [EntranceBuilderController::class, 'store']);
        Route::prefix('entrances')->group(function () {
            Route::get('{entrance_id}', [EntranceController::class, 'show']);
            Route::post('/', [EntranceController::class, 'store']);
            Route::put('{entrance_id}', [EntranceController::class, 'update']);
            Route::delete('{entrance_id}', [EntranceController::class, 'destroy']);
            Route::prefix('{entrance_id}/floors')->group(function () {
                Route::post('/', [FloorController::class, 'store']);
                Route::put('{floor_id}', [FloorController::class, 'update']);
                Route::delete('{floor_id}', [FloorController::class, 'destroy']);
            });
        });
    });
});

Route::post('house', [HouseBuilderController::class, 'store']);
