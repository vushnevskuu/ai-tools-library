"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Collection } from "@/types";
import { Chip } from "@/components/ui/Chip";
import { FIELD_LABELS } from "@/lib/constants";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-all duration-[var(--transition-base)] hover:border-[var(--color-border-strong)] hover:shadow-lg focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:ring-offset-2 dark:bg-[var(--color-surface-elevated)]"
    >
      <Link
        href={`/collections/${collection.slug}`}
        className="flex flex-1 flex-col"
      >
        <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={collection.preview.src}
            alt={collection.preview.alt}
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
            {collection.toolSlugs.length} tools
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-[var(--space-card)]">
          {collection.field && (
            <div className="flex flex-wrap gap-1">
              <Chip>{FIELD_LABELS[collection.field]}</Chip>
            </div>
          )}
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            {collection.title}
          </h3>
          <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
            {collection.tagline}
          </p>
        </div>
      </Link>
      <div className="p-[var(--space-card)]">
        <Link
          href={`/collections/${collection.slug}`}
          className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          View collection →
        </Link>
      </div>
    </motion.article>
  );
}
