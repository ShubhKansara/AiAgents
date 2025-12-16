<?php

namespace App\Repositories\Contracts;

use App\Models\AgentUsageLog;

interface UsageLogRepositoryInterface
{
    public function log(array $data): AgentUsageLog;
}
