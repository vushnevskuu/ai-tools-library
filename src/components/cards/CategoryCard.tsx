"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FIELD_LABELS } from "@/lib/constants";
import type { Field } from "@/types";

interface CategoryCardProps {
  slug: Field;
  toolCount: number;
}

export function CategoryCard({ slug, toolCount }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      <Link
        href={`/explore/${slug}`}
        className="block rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-[var(--transition-base)] hover:border-[var(--color-border-strong)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 dark:bg-[var(--color-surface-elevated)]"
      >
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
          {FIELD_LABELS[slug]}
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {toolCount} tools
        </p>
      </Link>
    </motion.div>
  );
}
