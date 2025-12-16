<?php

namespace Tests\Unit\Services;

use App\Models\Agent;
use App\Models\User;
use App\Repositories\Contracts\UsageLogRepositoryInterface;
use App\Services\AgentExecutionService;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;
use Mockery;

uses(TestCase::class);

beforeEach(function () {
    $this->usageRepo = Mockery::mock(UsageLogRepositoryInterface::class);
    $this->service = new AgentExecutionService($this->usageRepo);
});

test('execute calls python service and logs usage', function () {
    // Arrange
    $user = User::factory()->make(['id' => 1]);
    $agent = Agent::factory()->make(['id' => 1, 'slug' => 'test-agent']);
    $input = ['query' => 'hello'];

    Http::fake([
        'localhost:8000/agents/*/run' => Http::response([
            'output' => 'Agent response',
            'usage' => ['total_tokens' => 50, 'cost' => 0.05],
            'status' => 'success'
        ], 200),
    ]);

    $this->usageRepo->shouldReceive('log')
        ->once()
        ->with(Mockery::on(function ($data) use ($user, $agent) {
            return $data['user_id'] === $user->id &&
                $data['agent_id'] === $agent->id &&
                $data['tokens_total'] === 50;
        }))
        ->andReturn(new \App\Models\AgentUsageLog());

    // Act
    $result = $this->service->execute($user, $agent, $input);

    // Assert
    expect($result['output'])->toBe('Agent response');
    Http::assertSent(function ($request) use ($agent) {
        return $request->url() == "http://localhost:8000/agents/{$agent->id}/run" &&
            $request['input'] == ['query' => 'hello'];
    });
});
