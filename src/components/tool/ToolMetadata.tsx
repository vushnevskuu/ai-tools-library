import type { Tool } from "@/types";
import { Chip } from "@/components/ui/Chip";
import { FIELD_LABELS, TASK_LABELS, FORMAT_LABELS } from "@/lib/constants";

interface ToolMetadataProps {
  tool: Tool;
}

export function ToolMetadata({ tool }: ToolMetadataProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip>{FIELD_LABELS[tool.field]}</Chip>
      {tool.tasks.map((task) => (
        <Chip key={task}>{TASK_LABELS[task]}</Chip>
      ))}
      <Chip>{FORMAT_LABELS[tool.format]}</Chip>
      {tool.testedWith && tool.testedWith.length > 0 && (
        <Chip>Tested: {tool.testedWith.join(", ")}</Chip>
      )}
      <Chip>Updated: {new Date(tool.updatedAt).toLocaleDateString("en-US")}</Chip>
      {tool.version && <Chip>v{tool.version}</Chip>}
    </div>
  );
}
