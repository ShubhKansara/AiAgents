<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Repositories\Contracts\AgentRepositoryInterface::class,
            \App\Repositories\Eloquent\AgentRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\UsageLogRepositoryInterface::class,
            \App\Repositories\Eloquent\UsageLogRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
