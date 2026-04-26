"""Section-specific chain builders and invokers."""

from __future__ import annotations

from langchain_core.prompts import PromptTemplate

from app.core.config import ProviderModelConfig
from app.services.llm.prompts import (
    COVER_LETTER_PROMPT_TEMPLATE,
    SECTION_PROMPT_TEMPLATE,
)
from app.services.llm.providers import get_chat_model

MUTABLE_SECTIONS = ["projects", "experience", "skills", "education"]


async def customize_section(
    config: ProviderModelConfig,
    section_name: str,
    section_latex: str,
    job_description: str,
    role: str,
) -> str:
    """Customize an individual mutable section using provider-selected model."""
    prompt = PromptTemplate.from_template(SECTION_PROMPT_TEMPLATE)
    model = get_chat_model(config)
    chain = prompt | model

    result = await chain.ainvoke(
        {
            "section_name": section_name,
            "section_latex": section_latex,
            "job_description": job_description,
            "role": role,
        }
    )
    return getattr(result, "content", "").strip() or section_latex


async def generate_cover_letter(
    config: ProviderModelConfig,
    resume_latex: str,
    job_description: str,
    role: str,
) -> str:
    """Generate optional cover letter text."""
    prompt = PromptTemplate.from_template(COVER_LETTER_PROMPT_TEMPLATE)
    model = get_chat_model(config)
    chain = prompt | model

    result = await chain.ainvoke(
        {
            "resume_latex": resume_latex,
            "job_description": job_description,
            "role": role,
        }
    )
    return getattr(result, "content", "").strip()
