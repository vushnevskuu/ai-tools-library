"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Workflow } from "@/types";
import { Chip } from "@/components/ui/Chip";
import { FIELD_LABELS } from "@/lib/constants";

interface WorkflowCardProps {
  workflow: Workflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      <Link href={`/workflows/${workflow.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={workflow.preview.src}
            alt={workflow.preview.alt}
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
            {workflow.steps.length} steps
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex flex-wrap gap-1">
            <Chip>{FIELD_LABELS[workflow.field]}</Chip>
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            {workflow.title}
          </h3>
          <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
            {workflow.tagline}
          </p>
        </div>
      </Link>
      <div className="p-4">
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
