"""Merge customized section output back into a full LaTeX document."""

from __future__ import annotations

import re

SECTION_ORDER = ["experience", "projects", "skills", "education", "certifications"]


def _extract_header_footer(original_latex: str) -> tuple[str, str]:
    begin_index = original_latex.find("\\begin{document}")
    end_index = original_latex.rfind("\\end{document}")

    if begin_index == -1 or end_index == -1:
        return "", ""

    header = original_latex[: begin_index + len("\\begin{document}")]
    footer = original_latex[end_index:]
    return header, footer


def merge_sections_into_resume(
    original_latex: str,
    customized_sections: dict[str, str],
    certifications_original: str,
) -> str:
    """Create final LaTeX while preserving certifications section exactly."""
    header, footer = _extract_header_footer(original_latex)

    merged_parts: list[str] = []
    for section_name in SECTION_ORDER:
        if section_name == "certifications":
            merged_parts.append(certifications_original)
            continue
        merged_parts.append(customized_sections.get(section_name, ""))

    body = "\n\n".join(part.strip() for part in merged_parts if part.strip())

    if header and footer:
        return f"{header}\n\n{body}\n\n{footer}"

    # Fallback when source is not a full LaTeX document.
    return re.sub(r"\n{3,}", "\n\n", body).strip() + "\n"
