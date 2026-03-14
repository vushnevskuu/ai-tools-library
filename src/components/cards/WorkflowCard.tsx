"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Workflow } from "@/types";

interface WorkflowCardProps {
  workflow: Workflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-all duration-[var(--transition-base)] hover:border-[var(--color-border-strong)] hover:shadow-lg focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:ring-offset-2 dark:bg-[var(--color-surface-elevated)]"
    >
      <Link href={`/workflows/${workflow.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={workflow.preview.src}
            alt={workflow.preview.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
            {workflow.steps.length} steps
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            {workflow.title}
          </h3>
          <p className="line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">
            {workflow.tagline}
          </p>
        </div>
      </Link>
      <div className="px-4 py-3">
        <Link
          href={`/workflows/${workflow.slug}`}
          className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          View workflow →
        </Link>
      </div>
    </motion.article>
  );
}
