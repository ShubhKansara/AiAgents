<?php

namespace App\Repositories\Eloquent;

use App\Models\AgentUsageLog;
use App\Repositories\Contracts\UsageLogRepositoryInterface;

class UsageLogRepository implements UsageLogRepositoryInterface
{
    public function log(array $data): AgentUsageLog
    {
        return AgentUsageLog::create($data);
    }
}
