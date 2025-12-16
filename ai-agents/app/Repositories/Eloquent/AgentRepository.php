<?php

namespace App\Repositories\Eloquent;

use App\Models\Agent;
use App\Repositories\Contracts\AgentRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class AgentRepository implements AgentRepositoryInterface
{
    public function findAllActive(): Collection
    {
        return Agent::where('is_active', true)->get();
    }

    public function findBySlug(string $slug): ?Agent
    {
        return Agent::where('slug', $slug)->first();
    }
}
