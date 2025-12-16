<?php

namespace App\Repositories\Contracts;

use App\Models\Agent;
use Illuminate\Database\Eloquent\Collection;

interface AgentRepositoryInterface
{
    public function findAllActive(): Collection;
    public function findBySlug(string $slug): ?Agent;
}
