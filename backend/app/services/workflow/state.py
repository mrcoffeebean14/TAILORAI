"""Workflow state model for LangGraph orchestration."""

from __future__ import annotations

from typing import TypedDict

from app.schemas.generate import GenerateResumeRequest


class ResumeWorkflowState(TypedDict, total=False):
    request: GenerateResumeRequest
    parsed_sections: dict[str, str]
    customized_sections: dict[str, str]
    final_resume_latex: str
    cover_letter: str
