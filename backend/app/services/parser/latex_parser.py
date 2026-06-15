"""LaTeX section parsing utilities."""

from __future__ import annotations

import re
from dataclasses import dataclass

SECTION_KEYS = ["projects", "experience", "skills", "education", "certifications"]


@dataclass(slots=True)
class ParsedLatexResume:
    """Container for parsed sections and non-section segments."""

    original_latex: str
    sections: dict[str, str]


def _normalize_section_name(raw_name: str) -> str:
    return raw_name.strip().lower().replace(" ", "")


def parse_latex_sections(resume_latex: str) -> ParsedLatexResume:
    """Extract known sections from a LaTeX resume.

    Only returns sections that actually exist in the document.
    Missing sections are NOT injected with fallback placeholders so that
    the original document structure is preserved during merge.
    """
    pattern = re.compile(
        r"(\\section\{([^}]*)\}.*?)(?=\\section\{|\\end\{document\}|\Z)",
        flags=re.DOTALL | re.IGNORECASE,
    )

    parsed_sections: dict[str, str] = {}

    for block, raw_name in re.findall(pattern, resume_latex):
        key = _normalize_section_name(raw_name)
        if key in SECTION_KEYS:
            parsed_sections[key] = block.strip()

    return ParsedLatexResume(original_latex=resume_latex, sections=parsed_sections)
