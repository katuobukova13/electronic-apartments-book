<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
});

Route::get('/houses', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::prefix('/houses')->group(function () {
    Route::get('/{id}', function ($id) {
        return Inertia::render('HouseDetails', ['id' => $id]);
    });

    Route::prefix('/{id_house}/entrances')->group(function () {
        Route::get('/{id}', function ($house_id, $id) {
            return Inertia::render('EntranceDetails',
                ['house_id' => $house_id, 'id' => $id]);
        });
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
