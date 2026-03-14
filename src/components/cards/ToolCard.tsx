"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Tool } from "@/types";
import { CopyButton } from "@/components/ui/CopyButton";
import { Chip } from "@/components/ui/Chip";
import { FIELD_LABELS, FORMAT_LABELS } from "@/lib/constants";

interface ToolCardProps {
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

export function ToolCard({ tool }: ToolCardProps) {
  const copyText = getCopyText(tool);
  const previewSrc =
    "src" in tool.preview ? tool.preview.src : tool.preview.before;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      <Link href={`/tools/${tool.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={previewSrc}
            alt={tool.preview.alt ?? tool.title}
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex flex-wrap gap-1">
            <Chip>{FIELD_LABELS[tool.field]}</Chip>
            <Chip>{FORMAT_LABELS[tool.format]}</Chip>
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            {tool.title}
          </h3>
          <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
            {tool.tagline}
          </p>
          {tool.testedWith && tool.testedWith.length > 0 && (
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              Tested with {tool.testedWith.join(", ")}
            </p>
          )}
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-neutral-100 p-4 dark:border-neutral-800">
        <CopyButton text={copyText} label="Copy" />
        <Link
          href={`/tools/${tool.slug}`}
          className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Details →
        </Link>
      </div>
    </motion.article>
  );
}
