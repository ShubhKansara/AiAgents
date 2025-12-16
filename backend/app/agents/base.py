from abc import ABC, abstractmethod
from typing import Dict, Any, Type
from pydantic import BaseModel
from langchain_core.language_models.chat_models import BaseChatModel

class AgentMetadata(BaseModel):
    name: str
    description: str
    category: str
    inputs_schema: Dict[str, Any]  # JSON Schema for the inputs

class BaseAgent(ABC):
    @property
    @abstractmethod
    def metadata(self) -> AgentMetadata:
        pass

    @abstractmethod
    async def run(self, inputs: Dict[str, Any], llm: BaseChatModel) -> str:
        """
        Execute the agent logic.
        """
        pass
