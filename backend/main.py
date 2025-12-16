import os
# Fix for gRPC DNS resolution on macOS
os.environ["GRPC_DNS_RESOLVER"] = "native"

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List

from app.core.llm import LLMProvider, LLMSettings
from app.core.logger import logger
from app.agents.financial_advisor import FinancialAdvisorAgent
from app.agents.ledger_agent import LedgerAgent
from app.agents.code_review_agent import CodeReviewAgent

app = FastAPI(title="100 AI Agents API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registry of available agents
AGENTS = {
    "financial-advisor": FinancialAdvisorAgent(),
    "ledger-agent": LedgerAgent(),
    "code-review-agent": CodeReviewAgent()
}

# Supported Models Configuration
# Updated to use correct model names for Gemini and others
SUPPORTED_MODELS = {
    "openai": ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"],
    "gemini": [ "gemini-2.5-flash", "gemini-2.5-pro", "gemini-flash-latest", "gemini-2.5-flash-lite", "gemma-3-12b"],
    "perplexity": ["llama-3-sonar-large-32k-online", "llama-3-sonar-small-32k-online", "mixtral-8x7b-instruct"],
}

class AgentRunRequest(BaseModel):
    inputs: Dict[str, Any]
    llm_settings: LLMSettings

class AgentInfo(BaseModel):
    id: str
    name: str
    description: str
    category: str
    inputs_schema: Dict[str, Any]

@app.get("/")
async def root():
    return {"message": "Welcome to 100 AI Agents API"}

@app.get("/config/models")
async def list_models():
    """
    Returns the list of supported models grouped by provider.
    """
    return SUPPORTED_MODELS

@app.get("/agents", response_model=List[AgentInfo])
async def list_agents():
    results = []
    for agent_id, agent in AGENTS.items():
        meta = agent.metadata
        results.append(AgentInfo(
            id=agent_id,
            name=meta.name,
            description=meta.description,
            category=meta.category,
            inputs_schema=meta.inputs_schema
        ))
    return results

@app.post("/agents/{agent_id}/run")
async def run_agent(agent_id: str, request: AgentRunRequest):
    if agent_id not in AGENTS:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent = AGENTS[agent_id]
    
    try:
        # Run the agent
        logger.info(f"Received request to run agent: {agent_id}")
        result = await agent.execute(request.inputs, request.llm_settings)
        return {
            "output": result,
            "content_type": "text/markdown"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
