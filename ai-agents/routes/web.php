<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard / Agent Gallery
    Route::get('/dashboard', [\App\Http\Controllers\App\AgentController::class, 'index'])->name('dashboard');

    // Agent Routes
    Route::get('/agents/{slug}', [\App\Http\Controllers\App\AgentController::class, 'show'])->name('agents.show');
    Route::post('/agents/{agent}/run', [\App\Http\Controllers\App\AgentController::class, 'run'])->name('agents.run');

    // ADMIN Routes (Protected by role:Admin)
    Route::prefix('admin')->name('admin.')->middleware(['role:Admin'])->group(function () {
        Route::resource('agents', \App\Http\Controllers\Admin\AgentController::class);
    });
});

require __DIR__ . '/settings.php';
