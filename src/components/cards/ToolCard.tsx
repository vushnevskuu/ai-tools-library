"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Tool } from "@/types";
import { CopyButton } from "@/components/ui/CopyButton";
import { ToolPreviewBlock } from "@/components/cards/ToolPreviewBlock";

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

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-all duration-[var(--transition-base)] hover:border-[var(--color-border-strong)] hover:shadow-lg focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:ring-offset-2 dark:bg-[var(--color-surface-elevated)]"
    >
      <Link href={`/tools/${tool.slug}`} className="flex flex-1 flex-col">
        <ToolPreviewBlock tool={tool} className="transition-transform duration-300 group-hover:scale-[1.02]" />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              {tool.title}
            </h3>
            {tool.runtime?.interactionMode === "interactive" && (
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                Interactive
              </span>
            )}
          </div>
          <p className="line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">
            {tool.tagline}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-3">
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
