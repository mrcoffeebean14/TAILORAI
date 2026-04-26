export interface GenerateResumeRequest {
  resume_latex: string;
  job_description: string;
  role: string;
  generate_cover_letter: boolean;
}

export interface GenerateResumeResponse {
  final_resume_latex: string;
  cover_letter: string;
}

export interface ApiError {
  detail: string;
}
