import type { Tool } from "@/types";

/** Extract {{key}} placeholders from content. */
export function extractPlaceholders(content: string): string[] {
  const matches = content.matchAll(/\{\{(\w+)\}\}/g);
  const seen = new Set<string>();
  const keys: string[] = [];
  for (const m of matches) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      keys.push(m[1]);
    }
  }
  return keys;
}

/**
 * Interpolates {{key}} placeholders in prompt/template with user inputs.
 */
export function buildPromptFromTemplate(
  tool: Tool,
  inputs: Record<string, string | number>
): string {
  const raw =
    tool.content.prompt ??
    tool.content.template ??
    tool.content.agent ??
    tool.content.rules ??
    tool.content.instructions ??
    "";

  return raw.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = inputs[key];
    return val !== undefined && val !== null ? String(val) : `{{${key}}}`;
  });
}

/** Check if tool content has {{placeholder}} but no runtime config. */
export function hasPlaceholdersNoRuntime(tool: Tool): boolean {
  const content =
    tool.content.prompt ??
    tool.content.template ??
    tool.content.agent ??
    tool.content.rules ??
    tool.content.instructions ??
    "";
  return !tool.runtime && extractPlaceholders(content).length > 0;
}
