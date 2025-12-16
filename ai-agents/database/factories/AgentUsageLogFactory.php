<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AgentUsageLog>
 */
class AgentUsageLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'agent_id' => \App\Models\Agent::factory(),
            'tokens_input' => $this->faker->numberBetween(100, 1000),
            'tokens_output' => $this->faker->numberBetween(100, 2000),
            'tokens_total' => function (array $attributes) {
                return $attributes['tokens_input'] + $attributes['tokens_output'];
            },
            'duration_ms' => $this->faker->numberBetween(500, 5000),
            'provider' => 'openai',
            'model' => 'gpt-4',
            'is_own_key' => false,
            'cost_incurred' => $this->faker->randomFloat(6, 0.001, 0.1),
            'status' => 'success',
        ];
    }
}
