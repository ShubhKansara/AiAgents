from typing import Dict, Any
from langchain_core.prompts import PromptTemplate
from app.core.llm import LLMSettings
from app.agents.base import BaseAgent, AgentMetadata

class CodeReviewAgent(BaseAgent):
    @property
    def metadata(self) -> AgentMetadata:
        return AgentMetadata(
            name="AI Code Review Agent",
            description="Reviews code snippets for bugs, security risks, code smells, and best practices.",
            category="Development",
            inputs_schema={
                "type": "object",
                "properties": {
                    "code_snippet": {
                        "type": "string",
                        "description": "The code snippet to review"
                    },
                    "language": {
                        "type": "string",
                        "description": "Programming language (optional, auto-detect if empty)"
                    }
                },
                "required": ["code_snippet"]
            }
        )

    async def run(self, inputs: Dict[str, Any], llm_settings: LLMSettings, callbacks: list = None) -> str:
        code = inputs.get("code_snippet", "")
        language = inputs.get("language", "any language")
        
        template = """
You are a senior software engineer performing a code review.

Please analyze the following {language} code:

```
{code}
```

Tasks:
1. Identify any syntax errors or logical bugs.
2. Suggest security improvements (if applicable).
3. Recommend best practices, performance optimizations, or code style fixes.

Provide output in the following Markdown format:

## 🐞 Issues
*List of detected issues.*

## 🔒 Security
*Security analysis and recommendations.*

## 💡 Suggestions
*Best practices and improvements.*

## 📝 Overall Assessment
*A brief summary of the code quality.*
"""
        prompt = PromptTemplate.from_template(template)
        formatted_prompt = prompt.format(code=code, language=language)
        
        llm = self.get_llm(llm_settings, callbacks=callbacks)
        response = await llm.ainvoke(formatted_prompt)
        
        return response.content
