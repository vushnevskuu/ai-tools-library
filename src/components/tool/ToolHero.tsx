import Image from "next/image";
import type { Tool } from "@/types";
import { CopyButton } from "@/components/ui/CopyButton";

interface ToolHeroProps {
  tool: Tool;
}

function getCopyText(tool: Tool): string {
  const { content } = tool;
  return (
    content.prompt ??
    content.agent ??
    content.template ??
    content.rules ??
    content.instructions ??
    ""
  );
}

export function ToolHero({ tool }: ToolHeroProps) {
  const copyText = getCopyText(tool);
  const previewSrc =
    "src" in tool.preview ? tool.preview.src : tool.preview.before;

  return (
    <div className="space-y-6">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={previewSrc}
          alt={tool.preview.alt ?? tool.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            {tool.title}
          </h1>
          <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
            {tool.tagline}
          </p>
        </div>
        <CopyButton text={copyText} label="Copy" className="shrink-0" />
      </div>
    </div>
  );
}
