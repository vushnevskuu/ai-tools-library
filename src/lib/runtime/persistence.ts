const STORAGE_KEY = "ai-tools-runtime";

export interface PersistedToolState {
  toolSlug: string;
  inputs: Record<string, string | number>;
  lastUsed: string;
}

export function loadToolState(toolSlug: string): Record<string, string | number> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Record<string, PersistedToolState>;
    const state = data[toolSlug];
    return state?.inputs ?? null;
  } catch {
    return null;
  }
}

export function saveToolState(
  toolSlug: string,
  inputs: Record<string, string | number>
): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = (raw ? JSON.parse(raw) : {}) as Record<string, PersistedToolState>;
    data[toolSlug] = {
      toolSlug,
      inputs,
      lastUsed: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}
