from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List
from pydantic import BaseModel
from app.core.llm import LLMProvider, LLMSettings
from app.core.logger import logger
from app.core.callbacks import UsageTrackingHandler
from langchain_core.callbacks import BaseCallbackHandler

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
    async def run(self, inputs: Dict[str, Any], llm_settings: LLMSettings, callbacks: Optional[List[BaseCallbackHandler]] = None) -> str:
        """
        Execute the agent logic.
        """
        pass

    def get_llm(self, settings: LLMSettings, callbacks: Optional[List[BaseCallbackHandler]] = None):
        return LLMProvider.get_llm(settings, callbacks=callbacks)

    async def execute(self, inputs: Dict[str, Any], llm_settings: LLMSettings) -> Dict[str, Any]:
        """
        Wrapper around run to handle common logic like logging, error handling, and usage tracking.
        """
        logger.info(f"Starting agent execution: {self.metadata.name}")
        logger.debug(f"Inputs: {inputs}")
        logger.debug(f"LLM Settings: {llm_settings.dict(exclude={'api_key'})}")

        # Initialize Usage Tracking
        usage_handler = UsageTrackingHandler()
        callbacks = [usage_handler]

        try:
            output = await self.run(inputs, llm_settings, callbacks=callbacks)
            
            logger.info("Agent execution completed successfully")
            logger.debug(f"Output: {output}")
            
            # Collect Usage Stats
            usage_stats = {
                "total_tokens": usage_handler.total_tokens,
                "prompt_tokens": usage_handler.prompt_tokens,
                "completion_tokens": usage_handler.completion_tokens,
                "successful_requests": usage_handler.successful_requests
            }
            logger.info(f"Usage Stats: {usage_stats}")

            return {
                "output": output,
                "usage": usage_stats,
                "status": "success"
            }

        except Exception as e:
            logger.error(f"Agent execution failed: {str(e)}", exc_info=True)
            raise e
