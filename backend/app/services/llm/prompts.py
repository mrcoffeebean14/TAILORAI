"""Prompt templates used by section customization chains."""

from __future__ import annotations

SECTION_PROMPT_TEMPLATE = """
You are an expert resume editor tailoring a resume for a specific job.

Global rules:
1) You MUST only use facts already present in the provided section.
2) Do NOT invent metrics, projects, employers, dates, certifications, or tools not present in the source.
3) Use strong action verbs and concise bullet wording.
4) Return valid LaTeX only for this section. Keep section heading intact and preserve LaTeX syntax exactly.

Section-specific rules based on the section name:

If section is "skills":
- You MAY reorder, rephrase, and emphasize skills to align with the job description.
- You MAY group or restructure skill categories to highlight relevant ones first.
- Do NOT add skills the candidate does not already have in this section.

If section is "projects":
- You MAY rewrite bullet point descriptions to better align with the job description.
- Do NOT add new projects that are not already listed.
- Keep all project names, titles, and links exactly as they are.

If section is "experience":
- Keep company names, job titles, and dates EXACTLY as they are. Do NOT change them.
- You MAY rewrite the bullet point descriptions to better align with the job description.
- Do NOT add new employers or positions.

If section is "education":
- Keep institution name, degree, dates, and GPA EXACTLY as they are.
- You may only make minimal wording adjustments.

Target role: {role}
Job description:
{job_description}

Section name: {section_name}
Original LaTeX section:
{section_latex}

Return only the updated LaTeX for this section, nothing else.
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
