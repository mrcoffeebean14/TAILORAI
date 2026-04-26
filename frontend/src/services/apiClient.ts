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
    const body = (await response.json().catch(() => null)) as { detail?: string } | null;
    throw new Error(body?.detail ?? "Failed to generate resume");
  }

  return (await response.json()) as GenerateResumeResponse;
}
