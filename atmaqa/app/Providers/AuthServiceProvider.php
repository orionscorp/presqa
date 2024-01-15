<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('mahasiswa-only', function (User $user) {
            return $user->dosen_id === null && $user->mahasiswa_id != null;
        });

        Gate::define('dosen-only', function (User $user) {
            return $user->dosen_id != null && $user->mahasiswa_id === null;
        });

        Gate::define('admin-only', function (User $user) {
            return $user->dosen_id === null && $user->mahasiswa_id === null;
        });

        Gate::define('admin-and-dosen', function (User $user) {
            return ($user->dosen_id === null && $user->mahasiswa_id === null) || ($user->dosen_id != null && $user->mahasiswa_id === null);
        });
    }
}
