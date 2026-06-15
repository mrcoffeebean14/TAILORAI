import { GenerateResumeRequest, GenerateResumeResponse } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function generateResume(
  payload: GenerateResumeRequest,
): Promise<GenerateResumeResponse> {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      detail?: string | Array<{ msg: string; loc?: string[] }>;
    } | null;

    let errorMessage = "Failed to generate resume";
    if (body?.detail) {
      if (Array.isArray(body.detail)) {
        errorMessage = body.detail
          .map((err) => `${err.loc?.slice(1).join(".") || "field"}: ${err.msg}`)
          .join("; ");
      } else {
        errorMessage = body.detail;
      }
    }
    throw new Error(errorMessage);
  }

  return (await response.json()) as GenerateResumeResponse;
}
