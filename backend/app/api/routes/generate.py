"""Resume generation API endpoint."""

from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException, status

from app.core.exceptions import MalformedLatexError, ProviderNotConfiguredError
from app.schemas.generate import GenerateResumeRequest, GenerateResumeResponse
from app.services.workflow.graph import run_resume_workflow

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["resume"])


@router.post("/generate", response_model=GenerateResumeResponse)
async def generate_resume(payload: GenerateResumeRequest) -> GenerateResumeResponse:
    """Generate a job-tailored LaTeX resume and optional cover letter."""
    logger.info("Received resume generation request for role=%s", payload.role)

    try:
        workflow_output = await run_resume_workflow(payload)
    except MalformedLatexError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)
        ) from exc
    except ProviderNotConfiguredError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                f"{exc}. Update backend .env with matching provider key and app/config/model_provider.yaml settings."
            ),
        ) from exc
    except Exception as exc:  # noqa: BLE001
        logger.exception("Unhandled error during generation")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unexpected failure while generating resume",
        ) from exc

    return GenerateResumeResponse(**workflow_output)
