import type { GeneratePayload, StoryView } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(body.detail ?? "Request failed");
  }

  return response.json() as Promise<T>;
}

export function generateStory(payload: GeneratePayload) {
  return request<StoryView>("/api/stories/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getStory(storyId: string) {
  return request<StoryView>(`/api/stories/${storyId}`);
}

export function choosePath(storyId: string, choiceId: string) {
  return request<StoryView>(`/api/stories/${storyId}/choose`, {
    method: "POST",
    body: JSON.stringify({ choice_id: choiceId }),
  });
}
