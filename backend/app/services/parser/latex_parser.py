"""LaTeX section parsing utilities."""

from __future__ import annotations

import re
from dataclasses import dataclass

SECTION_KEYS = ["projects", "experience", "skills", "education", "certifications"]
SECTION_FALLBACKS: dict[str, str] = {
    "projects": "\\section{Projects}\n\\begin{itemize}\n\\item No project details provided.\n\\end{itemize}",
    "experience": "\\section{Experience}\n\\begin{itemize}\n\\item No experience details provided.\n\\end{itemize}",
    "skills": "\\section{Skills}\n\\begin{itemize}\n\\item Skills not provided.\n\\end{itemize}",
    "education": "\\section{Education}\n\\begin{itemize}\n\\item Education details not provided.\n\\end{itemize}",
    "certifications": "\\section{Certifications}\n\\begin{itemize}\n\\item No certifications listed.\n\\end{itemize}",
}


@dataclass(slots=True)
class ParsedLatexResume:
    """Container for parsed sections and non-section segments."""

    original_latex: str
    sections: dict[str, str]


def _normalize_section_name(raw_name: str) -> str:
    return raw_name.strip().lower().replace(" ", "")


def parse_latex_sections(resume_latex: str) -> ParsedLatexResume:
    """Extract known sections from a LaTeX resume with safe fallbacks."""
    pattern = re.compile(
        r"(\\section\{([^}]*)\}.*?)(?=\\section\{|\\end\{document\}|\Z)",
        flags=re.DOTALL | re.IGNORECASE,
    )

    parsed_sections: dict[str, str] = {}

    for block, raw_name in re.findall(pattern, resume_latex):
        key = _normalize_section_name(raw_name)
        if key in SECTION_KEYS:
            parsed_sections[key] = block.strip()

    for required_key in SECTION_KEYS:
        parsed_sections.setdefault(required_key, SECTION_FALLBACKS[required_key])

    return ParsedLatexResume(original_latex=resume_latex, sections=parsed_sections)
