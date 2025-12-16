import pandas as pd
from typing import Dict, Any
from langchain_core.prompts import PromptTemplate
from app.core.llm import LLMSettings
from app.agents.base import BaseAgent, AgentMetadata

class LedgerAgent(BaseAgent):
    @property
    def metadata(self) -> AgentMetadata:
        return AgentMetadata(
            name="Ledger Analysis Agent",
            description="Analyzes and reconciles ledger entries to detect imbalances and anomalies.",
            category="Finance",
            inputs_schema={
                "type": "object",
                "properties": {
                    "ledger_data": {
                        "type": "array",
                        "description": "List of transactions (optional, defaults to mock data)",
                        "items": {
                            "type": "object",
                            "properties": {
                                "Date": {"type": "string"},
                                "Description": {"type": "string"},
                                "Account": {"type": "string"},
                                "Debit": {"type": "number"},
                                "Credit": {"type": "number"}
                            }
                        }
                    }
                }
            }
        )

    def get_mock_ledger(self):
        data = {
            "Date": ["2025-07-01", "2025-07-01", "2025-07-02", "2025-07-02", "2025-07-03"],
            "Description": ["Customer Payment", "Revenue Recorded", "Office Supplies", "Cash Paid", "Consulting Income"],
            "Account": ["Accounts Receivable", "Revenue", "Office Supplies", "Cash", "Revenue"],
            "Debit": [0, 500, 100, 100, 0],
            "Credit": [500, 0, 0, 0, 1500],
        }
        return pd.DataFrame(data)

    async def run(self, inputs: Dict[str, Any], llm_settings: LLMSettings) -> str:
        # Load data
        if inputs.get("ledger_data"):
            df = pd.DataFrame(inputs["ledger_data"])
        else:
            df = self.get_mock_ledger()
            
        ledger_table = df.to_string(index=False)
        
        template = """
You are a financial ledger analyst AI. Analyze the following transactions:

{ledger_table}

Tasks:
1. Identify if the debits equal credits.
2. Highlight any imbalances or potential errors.
3. Provide a one-paragraph explanation of the ledger status.
"""
        prompt = PromptTemplate.from_template(template)
        formatted_prompt = prompt.format(ledger_table=ledger_table)
        
        llm = self.get_llm(llm_settings)
        response = await llm.ainvoke(formatted_prompt)
        
        return f"### Ledger Data Analysis\n\n{response.content}\n\n### Analyzed Ledger Data\n\n```\n{ledger_table}\n```"
