import type { Tool } from "@/types";

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
