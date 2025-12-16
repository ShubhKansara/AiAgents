<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Agent>
 */
class AgentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->jobTitle . ' Agent';
        return [
            'name' => $name,
            'slug' => \Illuminate\Support\Str::slug($name),
            'description' => $this->faker->sentence,
            'category' => $this->faker->randomElement(['Finance', 'Coding', 'Marketing', 'HR']),
            'is_active' => true,
            'input_schema' => ['type' => 'object', 'properties' => ['query' => ['type' => 'string']]],
            'endpoint' => '/agents/default/run', // Default endpoint
        ];
    }
}
