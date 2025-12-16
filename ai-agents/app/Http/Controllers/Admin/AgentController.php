<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgentController extends Controller
{
    public function index()
    {
        $agents = Agent::latest()->get();
        return Inertia::render('Admin/Agents/Index', [
            'agents' => $agents
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Agents/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'input_schema' => 'nullable|array',
            'endpoint' => 'nullable|string', // Added endpoint
            'is_active' => 'boolean'
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

        Agent::create($validated);

        return redirect()->route('admin.agents.index')->with('success', 'Agent created successfully.');
    }

    public function edit(Agent $agent)
    {
        return Inertia::render('Admin/Agents/Edit', [
            'agent' => $agent
        ]);
    }

    public function update(Request $request, Agent $agent)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'input_schema' => 'nullable|array',
            'endpoint' => 'nullable|string', // Added endpoint
            'is_active' => 'boolean'
        ]);

        if ($agent->name !== $validated['name']) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);
        }

        $agent->update($validated);

        return redirect()->route('admin.agents.index')->with('success', 'Agent updated successfully.');
    }

    public function destroy(Agent $agent)
    {
        $agent->delete();
        return redirect()->back()->with('success', 'Agent deleted successfully.');
    }
}
