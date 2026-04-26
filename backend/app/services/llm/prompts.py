"""Prompt templates used by section customization chains."""

from __future__ import annotations

SECTION_PROMPT_TEMPLATE = """
You are an expert resume editor.

Rules:
1) You MUST only use facts already present in the provided section and job description alignment context.
2) Do NOT invent metrics, projects, employers, dates, certifications, or tools not present in source section.
3) Use strong action verbs and concise bullet wording.
4) Return valid LaTeX only for this section.
5) Keep section heading intact and preserve LaTeX syntax.

Target role: {role}
Job description:
{job_description}

Section name: {section_name}
Original LaTeX section:
{section_latex}

Return only updated LaTeX for this section.
""".strip()

COVER_LETTER_PROMPT_TEMPLATE = """
You are an expert career writer.

Rules:
1) Base statements only on resume and job description content.
2) Do not hallucinate unknown facts.
3) Use professional tone and concise structure.
4) Return plain text only.

Role: {role}
Job description:
{job_description}

Resume context:
{resume_latex}
""".strip()
