<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Agent;

class AgentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $agents = [
            [
                'name' => 'Individualized Financial Advisory Agent',
                'slug' => 'financial-advisor',
                'description' => 'Provides personalized financial advice based on income, spending, goals, and risk profile.',
                'category' => 'Finance',
                'endpoint' => '/agents/financial-advisor/run',
                'is_active' => true,
                'input_schema' => [
                    "type" => "object",
                    "properties" => [
                        "income" => ["type" => "number", "description" => "Annual income"],
                        "expenses" => ["type" => "object", "description" => "Monthly expenses breakdown"],
                        "financial_goals" => ["type" => "array", "items" => ["type" => "string"], "description" => "List of financial goals"],
                        "risk_tolerance" => ["type" => "string", "enum" => ["low", "moderate", "high"], "description" => "Risk tolerance level"]
                    ],
                    "required" => ["income", "expenses", "financial_goals", "risk_tolerance"]
                ]
            ],
            [
                'name' => 'Ledger Analysis Agent',
                'slug' => 'ledger-agent',
                'description' => 'Analyzes and reconciles ledger entries to detect imbalances and anomalies.',
                'category' => 'Finance',
                'endpoint' => '/agents/ledger-agent/run',
                'is_active' => true,
                'input_schema' => [
                    "type" => "object",
                    "properties" => [
                        "ledger_data" => [
                            "type" => "array",
                            "description" => "List of transactions (optional, defaults to mock data)",
                            "items" => [
                                "type" => "object",
                                "properties" => [
                                    "Date" => ["type" => "string"],
                                    "Description" => ["type" => "string"],
                                    "Account" => ["type" => "string"],
                                    "Debit" => ["type" => "number"],
                                    "Credit" => ["type" => "number"]
                                ]
                            ]
                        ]
                    ]
                ]
            ],
            [
                'name' => 'AI Code Review Agent',
                'slug' => 'code-review-agent',
                'description' => 'Reviews code snippets for bugs, security risks, code smells, and best practices.',
                'category' => 'Development',
                'endpoint' => '/agents/code-review-agent/run',
                'is_active' => true,
                'input_schema' => [
                    "type" => "object",
                    "properties" => [
                        "code_snippet" => [
                            "type" => "string",
                            "description" => "The code snippet to review"
                        ],
                        "language" => [
                            "type" => "string",
                            "description" => "Programming language (optional, auto-detect if empty)"
                        ]
                    ],
                    "required" => ["code_snippet"]
                ]
            ],
            [
                'name' => 'AI-powered SEO Optimization Agent',
                'slug' => 'seo-agent',
                'description' => 'Analyzes content and provides SEO improvements like keywords, meta descriptions, and title tags.',
                'category' => 'Marketing',
                'endpoint' => '/agents/seo-agent/run',
                'is_active' => true,
                'input_schema' => [
                    "type" => "object",
                    "properties" => [
                        "content" => [
                            "type" => "string",
                            "description" => "The web content or article to analyze"
                        ],
                        "target_keyword" => [
                            "type" => "string",
                            "description" => "The primary keyword to target"
                        ]
                    ],
                    "required" => ["content", "target_keyword"]
                ]
            ],
            [
                'name' => 'Business Strategy Advisor',
                'slug' => 'business-strategy-advisor',
                'description' => 'Analyzes business context to provide strategic priorities, SWOT analysis, and OKRs.',
                'category' => 'Business',
                'endpoint' => '/agents/business-strategy-advisor/run',
                'is_active' => true,
                'input_schema' => [
                    "type" => "object",
                    "properties" => [
                        "goals" => [
                            "type" => "string",
                            "description" => "Company goals (e.g., 'Expand into EMEA')"
                        ],
                        "threats" => [
                            "type" => "string",
                            "description" => "External risks or threats"
                        ],
                        "market_trends" => [
                            "type" => "string",
                            "description" => "Relevant market trends"
                        ]
                    ],
                    "required" => ["goals", "threats", "market_trends"]
                ]
            ]
        ];

        foreach ($agents as $agent) {
            Agent::updateOrCreate(
                ['slug' => $agent['slug']],
                $agent
            );
        }
    }
}
