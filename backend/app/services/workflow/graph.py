"""LangGraph workflow for resume customization."""

from __future__ import annotations

import asyncio

from langgraph.graph import END, START, StateGraph

from app.core.config import load_provider_model_config
from app.schemas.generate import GenerateResumeRequest
from app.services.chains.section_chains import (
    MUTABLE_SECTIONS,
    customize_section,
    generate_cover_letter,
)
from app.services.latex.merge import merge_sections_into_resume
from app.services.latex.validator import validate_latex_structure
from app.services.parser.latex_parser import parse_latex_sections
from app.services.workflow.state import ResumeWorkflowState


def _build_graph():
    builder = StateGraph(ResumeWorkflowState)

    async def parse_node(state: ResumeWorkflowState) -> ResumeWorkflowState:
        request = state["request"]
        validate_latex_structure(request.resume_latex)
        parsed = parse_latex_sections(request.resume_latex)
        return {
            "parsed_sections": parsed.sections,
            "customized_sections": {
                "certifications": parsed.sections["certifications"]
            },
            "cover_letter": "",
        }

    async def customize_sections_node(
        state: ResumeWorkflowState,
    ) -> ResumeWorkflowState:
        request = state["request"]
        parsed_sections = state["parsed_sections"]
        config = load_provider_model_config()

        tasks = [
            customize_section(
                config=config,
                section_name=section_name,
                section_latex=parsed_sections[section_name],
                job_description=request.job_description,
                role=request.role,
            )
            for section_name in MUTABLE_SECTIONS
        ]
        outputs = await asyncio.gather(*tasks)

        customized = dict(state.get("customized_sections", {}))
        for idx, section_name in enumerate(MUTABLE_SECTIONS):
            customized[section_name] = outputs[idx]

        return {"customized_sections": customized}

    async def merge_node(state: ResumeWorkflowState) -> ResumeWorkflowState:
        request = state["request"]
        parsed_sections = state["parsed_sections"]
        customized_sections = state["customized_sections"]

        final_resume = merge_sections_into_resume(
            original_latex=request.resume_latex,
            customized_sections=customized_sections,
            certifications_original=parsed_sections["certifications"],
        )
        validate_latex_structure(final_resume)
        return {"final_resume_latex": final_resume}

    async def cover_letter_node(state: ResumeWorkflowState) -> ResumeWorkflowState:
        request = state["request"]
        if not request.generate_cover_letter:
            return {"cover_letter": ""}

        config = load_provider_model_config()
        text = await generate_cover_letter(
            config=config,
            resume_latex=state["final_resume_latex"],
            job_description=request.job_description,
            role=request.role,
        )
        return {"cover_letter": text}

    builder.add_node("parse", parse_node)
    builder.add_node("customize_sections", customize_sections_node)
    builder.add_node("merge", merge_node)
    builder.add_node("cover_letter", cover_letter_node)

    builder.add_edge(START, "parse")
    builder.add_edge("parse", "customize_sections")
    builder.add_edge("customize_sections", "merge")
    builder.add_edge("merge", "cover_letter")
    builder.add_edge("cover_letter", END)

    return builder.compile()


async def run_resume_workflow(request: GenerateResumeRequest) -> dict[str, str]:
    """Execute full resume customization graph and return final outputs."""
    graph = _build_graph()
    state = await graph.ainvoke({"request": request})

    return {
        "final_resume_latex": state.get("final_resume_latex", request.resume_latex),
        "cover_letter": state.get("cover_letter", ""),
    }
