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
        href={`/explore?field=${slug}`}
        className="block rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
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
