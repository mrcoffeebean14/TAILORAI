"""Lightweight LaTeX validation helpers."""

from __future__ import annotations

from app.core.exceptions import MalformedLatexError


def validate_latex_structure(latex: str) -> None:
    """Run minimal structural checks to catch malformed input early."""
    if not latex or len(latex.strip()) < 10:
        raise MalformedLatexError("LaTeX resume cannot be empty")

    if latex.count("{") != latex.count("}"):
        raise MalformedLatexError("Unbalanced braces detected in LaTeX input")

    has_begin = "\\begin{document}" in latex
    has_end = "\\end{document}" in latex
    if has_begin != has_end:
        raise MalformedLatexError("LaTeX document markers are incomplete")
