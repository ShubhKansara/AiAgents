import os
from functools import lru_cache
from typing import Optional

from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.language_models.chat_models import BaseChatModel
from pydantic import BaseModel

class LLMSettings(BaseModel):
    model_config = {'protected_namespaces': ()}
    provider: str
    model_name: str
    temperature: float = 0.7
    api_key: Optional[str] = None

class LLMProvider:
    @staticmethod
    def get_llm(settings: LLMSettings) -> BaseChatModel:
        if settings.provider == "openai":
            return ChatOpenAI(
                model=settings.model_name,
                temperature=settings.temperature,
                api_key=settings.api_key or os.getenv("OPENAI_API_KEY"),
            )
        elif settings.provider == "gemini":
            return ChatGoogleGenerativeAI(
                model=settings.model_name,
                temperature=settings.temperature,
                google_api_key=settings.api_key or os.getenv("GOOGLE_API_KEY"),
            )
        elif settings.provider == "perplexity":
            # Perplexity is compatible with OpenAI API
            return ChatOpenAI(
                model=settings.model_name,
                temperature=settings.temperature,
                api_key=settings.api_key or os.getenv("PERPLEXITY_API_KEY"),
                base_url="https://api.perplexity.ai",
            )
        else:
            raise ValueError(f"Unsupported provider: {settings.provider}")
