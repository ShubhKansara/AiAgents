from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from pydantic import BaseModel
from app.core.llm import LLMProvider, LLMSettings
from app.core.logger import logger

class AgentMetadata(BaseModel):
    name: str
    description: str
    category: str
    inputs_schema: Dict[str, Any]

class BaseAgent(ABC):
    @property
    @abstractmethod
    def metadata(self) -> AgentMetadata:
        pass

    @abstractmethod
    async def run(self, inputs: Dict[str, Any], llm_settings: LLMSettings) -> str:
        """
        Execute the agent logic.
        """
        pass

    def get_llm(self, settings: LLMSettings):
        return LLMProvider.get_llm(settings)

    async def execute(self, inputs: Dict[str, Any], llm_settings: LLMSettings) -> Any:
        """
        Wrapper around run to handle common logic like logging or error handling.
        """
        logger.info(f"Starting agent execution: {self.metadata.name}")
        logger.debug(f"Inputs: {inputs}")
        logger.debug(f"LLM Settings: {llm_settings.dict(exclude={'api_key'})}")

        try:
            result = await self.run(inputs, llm_settings)
            logger.info("Agent execution completed successfully")
            logger.debug(f"Output: {result}")
            return result
        except Exception as e:
            logger.error(f"Agent execution failed: {str(e)}", exc_info=True)
            raise e
