<?php

namespace Tests\Unit\Repositories;

use App\Models\Agent;
use App\Repositories\Eloquent\AgentRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

beforeEach(function () {
    $this->repository = new AgentRepository();
});

test('findAllActive returns only active agents', function () {
    // Arrange
    Agent::factory()->create(['is_active' => true, 'name' => 'Active Agent']);
    Agent::factory()->create(['is_active' => false, 'name' => 'Inactive Agent']);

    // Act
    $result = $this->repository->findAllActive();

    // Assert
    expect($result)->toHaveCount(1);
    expect($result->first()->name)->toBe('Active Agent');
});

test('findBySlug returns correct agent', function () {
    // Arrange
    $agent = Agent::factory()->create(['slug' => 'test-agent']);

    // Act
    $result = $this->repository->findBySlug('test-agent');

    // Assert
    expect($result)->not->toBeNull();
    expect($result->id)->toBe($agent->id);
});

test('findBySlug returns null for non-existent agent', function () {
    // Act
    $result = $this->repository->findBySlug('non-existent');

    // Assert
    expect($result)->toBeNull();
});
