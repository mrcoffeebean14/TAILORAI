"""Merge customized section output back into a full LaTeX document."""

from __future__ import annotations

import re


def merge_sections_into_resume(
    original_latex: str,
    customized_sections: dict[str, str],
) -> str:
    """Replace only customized sections in-place, preserving all other content.

    Instead of rebuilding the document from extracted parts, this performs
    surgical in-place replacement of each section that was customized,
    keeping the heading block, preamble, and any unrecognized sections
    exactly as they appeared in the original.
    """
    result = original_latex

    # Pattern matches each \section{...} block up to the next \section or \end{document}
    section_pattern = re.compile(
        r"(\\section\{([^}]*)\}.*?)(?=\\section\{|\\end\{document\}|\Z)",
        flags=re.DOTALL | re.IGNORECASE,
    )

    # Find all section blocks and their positions; iterate in reverse
    # so earlier replacements don't shift the offsets of later ones.
    matches = list(section_pattern.finditer(result))

    for match in reversed(matches):
        raw_name = match.group(2)
        key = raw_name.strip().lower().replace(" ", "")

        if key in customized_sections and customized_sections[key].strip():
            start = match.start(1)
            end = match.end(1)
            replacement = customized_sections[key].strip() + "\n\n"
            result = result[:start] + replacement + result[end:]

    return result
