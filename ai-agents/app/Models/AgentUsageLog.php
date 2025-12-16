<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Agent;

class AgentUsageLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'agent_id',
        'tokens_input',
        'tokens_output',
        'tokens_total',
        'duration_ms',
        'provider',
        'model',
        'is_own_key',
        'cost_incurred',
        'status',
        'error_message'
    ];

    protected $casts = [
        'is_own_key' => 'boolean',
        'cost_incurred' => 'decimal:6',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }
}
