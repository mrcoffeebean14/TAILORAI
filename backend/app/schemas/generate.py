"""Request and response schemas for resume generation API."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field, field_validator


class GenerateResumeRequest(BaseModel):
    """Input payload accepted by POST /api/generate."""

    model_config = ConfigDict(str_strip_whitespace=True)

    resume_latex: str = Field(min_length=10)
    job_description: str = Field(min_length=20)
    role: str = Field(min_length=2, max_length=120)
    generate_cover_letter: bool = False

    @field_validator("resume_latex")
    @classmethod
    def validate_resume_has_latex_markers(cls, value: str) -> str:
        if "\\section" not in value and "\\begin{document}" not in value:
            raise ValueError("resume_latex must look like valid LaTeX content")
        return value


class GenerateResumeResponse(BaseModel):
    """Output payload returned by POST /api/generate."""

    final_resume_latex: str
    cover_letter: str = ""


class ApiErrorResponse(BaseModel):
    """Standardized API error response model."""

    detail: str
