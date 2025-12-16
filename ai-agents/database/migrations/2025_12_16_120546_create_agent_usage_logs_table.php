<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agent_usage_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('agent_id')->constrained();
            $table->integer('tokens_input')->default(0);
            $table->integer('tokens_output')->default(0);
            $table->integer('tokens_total')->default(0);
            $table->integer('duration_ms')->nullable();
            $table->string('provider')->nullable(); // 'openai', 'gemini'
            $table->string('model')->nullable(); // 'gpt-4'
            $table->boolean('is_own_key')->default(false); // TRUE if User Key, FALSE if Platform Key
            $table->decimal('cost_incurred', 10, 6)->default(0); // If Platform Key, calculating cost
            $table->string('status')->default('success');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agent_usage_logs');
    }
};
