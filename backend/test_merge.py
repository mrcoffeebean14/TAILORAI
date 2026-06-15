"""Quick test to verify the in-place merge preserves full document structure."""
from app.services.parser.latex_parser import parse_latex_sections
from app.services.latex.merge import merge_sections_into_resume

SAMPLE = r"""
\documentclass[10pt,letterpaper]{article}
\usepackage{geometry}
\begin{document}

\begin{center}
{\Huge \scshape Mandeep Singh}
\end{center}

\section{Summary}
Final-year CSE student with hands-on experience.

\section{Education}
\textbf{Bennett University -- B.Tech in CSE}

\section{Skills}
\textbf{Languages:} Python, C++

\section{Experience}
\textbf{Software Engineer Intern}
\begin{itemize}
\item Built APIs
\end{itemize}

\section{Projects}
\textbf{TAILORAI}
\begin{itemize}
\item Built a multi-agent pipeline
\end{itemize}

\section{Achievements}
\begin{itemize}
\item Ranked Top 10 at SIH
\end{itemize}

\section{Positions of Responsibility}
\textbf{Social-Media Head}

\end{document}
""".strip()

# Parse
parsed = parse_latex_sections(SAMPLE)
print("=== Parsed sections ===")
for k, v in parsed.sections.items():
    print(f"  {k}: {v[:40]}...")

# Simulate customized sections (only experience and skills modified)
customized = {
    "experience": r"""\section{Experience}
\textbf{Software Engineer Intern -- CUSTOMIZED}
\begin{itemize}
\item Built 6+ production REST APIs -- CUSTOMIZED
\end{itemize}""",
    "skills": r"""\section{Skills}
\textbf{Languages:} Python, C++, JavaScript -- CUSTOMIZED""",
}

# Merge
result = merge_sections_into_resume(SAMPLE, customized)

print("\n=== Merged result ===")
print(result)

# Verify key parts are preserved
checks = [
    (r"\documentclass", "Preamble"),
    (r"\usepackage{geometry}", "Packages"),
    (r"\Huge \scshape Mandeep Singh", "Heading"),
    (r"\section{Summary}", "Summary section"),
    (r"CUSTOMIZED", "Customized content"),
    (r"\section{Achievements}", "Achievements section"),
    (r"\section{Positions of Responsibility}", "Positions section"),
    (r"Ranked Top 10", "Achievements content"),
    (r"\end{document}", "Document footer"),
]

print("\n=== Verification ===")
all_ok = True
for text, label in checks:
    found = text in result
    status = "OK" if found else "MISSING"
    if not found:
        all_ok = False
    print(f"  [{status}] {label}")

print(f"\nResult: {'ALL PASSED' if all_ok else 'SOME FAILED'}")
