<?php

namespace App\Services;

use App\Models\Agent;
use App\Models\User;
use App\Repositories\Contracts\UsageLogRepositoryInterface;
use Illuminate\Support\Facades\Http;

class AgentExecutionService
{
    public function __construct(
        protected UsageLogRepositoryInterface $usageRepo
    ) {}

    public function execute(User $user, Agent $agent, array $input, $userProvidedKey = null): array
    {
        // 1. Determine API Key (Logic pending - defaulting to platform key for now or handled by Python side if not passed)
        // Ideally we would look up UserApiSetting here.

        // 2. Call Python Service
        // Use configured endpoint or fallback to default convention
        $endpoint = $agent->endpoint ?? "/agents/{$agent->id}/run";
        $url = "http://localhost:8000" . (str_starts_with($endpoint, '/') ? $endpoint : '/' . $endpoint);

        $response = Http::post($url, [
            'input' => $input,
            'api_key' => $userProvidedKey,
        ]);

        if ($response->failed()) {
            // Handle error - for now throw exception or return error
            throw new \Exception("Agent execution failed: " . $response->body());
        }

        $data = $response->json();

        // 3. Log Usage
        if (isset($data['usage'])) {
            $this->usageRepo->log([
                'user_id' => $user->id,
                'agent_id' => $agent->id,
                'tokens_input' => $data['usage']['prompt_tokens'] ?? 0,
                'tokens_output' => $data['usage']['completion_tokens'] ?? 0,
                'tokens_total' => $data['usage']['total_tokens'] ?? 0,
                'duration_ms' => 0, // Pending: calculate duration
                'provider' => 'openai', // Pending: get from response
                'model' => 'gpt-4', // Pending: get from response
                'is_own_key' => !empty($userProvidedKey),
                'cost_incurred' => $data['usage']['cost'] ?? 0.0,
                'status' => 'success',
            ]);
        }

        return $data;
    }
}
