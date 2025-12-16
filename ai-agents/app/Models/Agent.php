<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AgentUsageLog; // Added for AgentUsageLog::class

class Agent extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'category',
        'is_active',
        'input_schema',
        'endpoint', // Added endpoint
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'input_schema' => 'array',
    ];

    public function usageLogs()
    {
        return $this->hasMany(AgentUsageLog::class);
    }
}
