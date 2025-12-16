from typing import Dict, Any
from langchain_core.prompts import PromptTemplate
from app.core.llm import LLMSettings
from app.agents.base import BaseAgent, AgentMetadata

class SeoOptimizationAgent(BaseAgent):
    @property
    def metadata(self) -> AgentMetadata:
        return AgentMetadata(
            name="AI-powered SEO Optimization Agent",
            description="Analyzes content and provides SEO improvements like keywords, meta descriptions, and title tags.",
            category="Marketing",
            inputs_schema={
                "type": "object",
                "properties": {
                    "content": {
                        "type": "string",
                        "description": "The web content or article to analyze"
                    },
                    "target_keyword": {
                        "type": "string",
                        "description": "The primary keyword to target"
                    }
                },
                "required": ["content", "target_keyword"]
            }
        )

    async def run(self, inputs: Dict[str, Any], llm_settings: LLMSettings) -> str:
        content = inputs.get("content", "")
        keyword = inputs.get("target_keyword", "")
        
        template = """
You are an SEO optimization expert.

Given the following content:
{content}

And the target keyword: "{keyword}"

Provide your analysis in the following Markdown format:

## 🏷️ Optimized Metadata
- **SEO Title** (max 60 chars): *[suggested title]*
- **Meta Description** (max 155 chars): *[suggested description]*

## 🔑 Keyword Analysis
*Analyze keyword density, placement, and relevance.*

## 📄 Content Suggestions
*Suggest improvements for headings, semantic richness, and readability.*

## 🚀 Semantic Keywords
*List related keywords to include.*
"""
        prompt = PromptTemplate.from_template(template)
        formatted_prompt = prompt.format(content=content, keyword=keyword)
        
        llm = self.get_llm(llm_settings)
        response = await llm.ainvoke(formatted_prompt)
        
        return response.content
