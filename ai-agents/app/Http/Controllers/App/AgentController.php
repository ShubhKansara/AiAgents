<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Repositories\Contracts\AgentRepositoryInterface;
use App\Services\AgentExecutionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgentController extends Controller
{
    public function __construct(
        protected AgentRepositoryInterface $agentRepo,
        protected AgentExecutionService $executionService
    ) {}

    public function index()
    {
        $agents = $this->agentRepo->findAllActive();
        return Inertia::render('App/Dashboard', [
            'agents' => $agents
        ]);
    }

    public function show(string $slug)
    {
        $agent = $this->agentRepo->findBySlug($slug);

        if (!$agent) {
            abort(404);
        }

        return Inertia::render('App/Agent/Show', [
            'agent' => $agent
        ]);
    }

    public function run(Request $request, Agent $agent)
    {
        // 1. Validate Input
        $input = $request->validate([
            'query' => 'required|string',
            // Add other dynamic validation based on schema if needed
        ]);

        // 2. Execute Service
        try {
            $result = $this->executionService->execute(
                $request->user(),
                $agent,
                $input,
                // Pass user key if provided in request, e.g. for BYO key
                $request->input('api_key')
            );

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
