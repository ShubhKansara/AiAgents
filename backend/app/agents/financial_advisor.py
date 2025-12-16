from typing import Dict, Any
from langchain_core.prompts import PromptTemplate
from langchain_core.language_models.chat_models import BaseChatModel
from app.core.llm import LLMSettings

from app.agents.base import BaseAgent, AgentMetadata

class FinancialAdvisorAgent(BaseAgent):
    @property
    def metadata(self) -> AgentMetadata:
        return AgentMetadata(
            name="Individualized Financial Advisory Agent",
            description="Provides personalized financial advice based on income, spending, goals, and risk profile.",
            category="Finance",
            inputs_schema={
                "type": "object",
                "properties": {
                    "income": {"type": "number", "description": "Annual income"},
                    "expenses": {"type": "object", "description": "Monthly expenses breakdown"},
                    "financial_goals": {"type": "array", "items": {"type": "string"}, "description": "List of financial goals"},
                    "risk_tolerance": {"type": "string", "enum": ["low", "moderate", "high"], "description": "Risk tolerance level"}
                },
                "required": ["income", "expenses", "financial_goals", "risk_tolerance"]
            }
        )

    async def run(self, inputs: Dict[str, Any], llm_settings: LLMSettings) -> str:
        llm = self.get_llm(llm_settings)
        template = """
You are a financial advisor AI. Given the user's financial profile below, provide 3 personalized suggestions:
- Summarize their financial status
- Suggest a monthly savings goal
- Recommend an investment strategy based on their risk profile

User Profile:
Income: ${income}
Expenses: ${expenses}
Goals: ${goals}
Risk: ${risk}

Respond clearly and concisely.
"""
        prompt = PromptTemplate.from_template(template)
        
        # Format inputs
        goals_str = ", ".join(inputs.get("financial_goals", []))
        formatted_prompt = prompt.format(
            income=inputs.get("income"),
            expenses=inputs.get("expenses"),
            goals=goals_str,
            risk=inputs.get("risk_tolerance")
        )
        
        response = await llm.ainvoke(formatted_prompt)
        return response.content
