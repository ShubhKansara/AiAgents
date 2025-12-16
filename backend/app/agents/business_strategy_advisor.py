from typing import Dict, Any
from langchain_core.prompts import PromptTemplate
from app.core.llm import LLMSettings
from app.agents.base import BaseAgent, AgentMetadata

class BusinessStrategyAdvisor(BaseAgent):
    @property
    def metadata(self) -> AgentMetadata:
        return AgentMetadata(
            name="Business Strategy Advisor",
            description="Analyzes business context to provide strategic priorities, SWOT analysis, and OKRs.",
            category="Business",
            inputs_schema={
                "type": "object",
                "properties": {
                    "goals": {
                        "type": "string",
                        "description": "Company goals (e.g., 'Expand into EMEA')"
                    },
                    "threats": {
                        "type": "string",
                        "description": "External risks or threats"
                    },
                    "market_trends": {
                        "type": "string",
                        "description": "Relevant market trends"
                    }
                },
                "required": ["goals", "threats", "market_trends"]
            }
        )

    async def run(self, inputs: Dict[str, Any], llm_settings: LLMSettings, callbacks: list = None) -> str:
        goals = inputs.get("goals", "")
        threats = inputs.get("threats", "")
        market_trends = inputs.get("market_trends", "")
        
        template = """
You are a Business Strategy Advisor AI.

Based on the following input:

**🎯 Company Goals:**
{goals}

**⚠️ External Threats:**
{threats}

**📈 Market Trends:**
{market_trends}

Provide a strategic plan in the following Markdown format:

## 🧭 Strategic Priorities
*List 3-5 high-impact strategic initiatives.*

## 📊 SWOT Summary
- **Strengths:** [Analysis based on context]
- **Weaknesses:** [Analysis based on context]
- **Opportunities:** [Derived from market trends]
- **Threats:** [Derived from inputs]

## 🎯 Proposed OKRs
*Draft 3 key Objectives with 2-3 Key Results each.*
"""
        prompt = PromptTemplate.from_template(template)
        formatted_prompt = prompt.format(goals=goals, threats=threats, market_trends=market_trends)
        
        llm = self.get_llm(llm_settings, callbacks=callbacks)
        response = await llm.ainvoke(formatted_prompt)
        
        return response.content
