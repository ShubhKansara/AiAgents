# Unified AI Agent System - Project Plan

## 🎯 Objective

Create a single, unified web-based platform to host, interact with, and manage 100+ AI Agents. The system will support dynamic model switching (OpenAI, Gemini, Perplexity) and provide a consistent, premium user experience.

## 🏗 Technology Stack

### Frontend

- **Framework**: **Next.js 14** (React)
- **Language**: TypeScript
- **Styling**: **TailwindCSS** + **Framer Motion** (for animations) + **shadcn/ui** (components)
- **State Management**: **Zustand**
- **Rationale**: Next.js provides excellent performance and routing. Tailwind and shadcn/ui allow for rapid development of modern, accessible UIs.

### Backend

- **Framework**: **FastAPI** (Python)
- **Language**: Python 3.11+
- **AI Orchestration**: **LangChain**
- **Rationale**: Python is the native language of AI. FastAPI is high-performance and async, perfect for handling concurrent LLM requests. LangChain offers a standard interface for swapping LLM providers.

## 📐 System Architecture

The project will be structured as a monorepo containing both frontend and backend.

```
/unified-platform
├── /frontend          # Next.js Application
│   ├── /components    # Reusable UI components
│   ├── /app           # Pages and routing
│   └── /lib           # API clients and utilities
│
└── /backend           # FastAPI Application
    ├── /app
    │   ├── /agents    # Logic for individual agents (migrated from standalone scripts)
    │   ├── /core      # LLM Provider logic & Configuration
    │   └── /api       # REST Endpoints
    └── main.py        # Entry point
```

### Key Modules

#### 1. Multi-Model LLM Provider (`backend/app/core/llm.py`)

A unified factory to instantiate LLM clients based on user selection.

- **Supported Providers**:
  - `openai`: GPT-4o, GPT-3.5-turbo
  - `gemini`: Gemini 1.5 Pro, Gemini 1.5 Flash
  - `perplexity`: Llama 3, Sonar
- **User Inputs**: API Keys will be handled securely (e.g., passed in headers or stored in session).

#### 2. Universal Agent Interface (`backend/app/agents/base.py`)

A base class that all 100 agents must inherit from to ensure compatibility.

```python
class BaseAgent:
    name: str
    slug: str
    description: str
    inputs: dict  # JSON Schema for UI generation

    async def run(self, inputs: dict, llm_provider: BaseChatModel) -> str:
        pass
```

#### 3. Frontend Dashboard

- **Agent Marketplace**: A grid/list view with search and categories to browse agents.
- **Workspace**: A split-screen view.
  - **Left**: Agent Configuration (Model selection, Input forms).
  - **Right**: Chat/Output window.

## 🗓 Implementation Roadmap

### Phase 1: Foundation Setup

1. Initialize Project Repository (Frontend + Backend).
2. Set up the `LLMProvider` factory (OpenAI, Gemini, Perplexity).
3. Create the `BaseAgent` abstract class.

### Phase 2: Core API & Migration (Pilot)

4. Migrate the first 5 agents (e.g., Financial Advisor, Video Script Gen) to the new class system.
5. Create API endpoints:
   - `GET /agents`: List available agents.
   - `POST /agents/{id}/run`: Execute an agent.

### Phase 3: Frontend Development

6. Build the specific UI for Agent Marketplace.
7. Implement the dynamic form generator (renders inputs based on Agent schema).
8. Build the Chat/Result display with streaming support.

### Phase 4: Scaling

9. Systematically migrate remaining 95 agents.
10. Add persistent history/storage for agent runs (optional SQLite/Postgres DB).

## 🚀 Execution Strategy

We will start by setting up the skeleton properties and verifying that we can switch between OpenAI and Gemini for a simple "Hello World" agent. Once verified, we will begin porting the complex agents.
