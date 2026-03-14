import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";

const BUILDERS = [
  {
    slug: "design-system",
    title: "Design System Builder",
    tagline: "Create tokens, export JSON, CSS, Tailwind — one source of truth.",
    preview: "/previews/design-system-builder.svg",
    href: "/builders/design-system",
  },
];

export default function BuildersPage() {
  return (
    <PageContainer className="py-12">
      <div className="mb-12">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Builders
        </h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          Interactive utilities for daily design work
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {BUILDERS.map((builder) => (
          <article
            key={builder.slug}
            className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-all duration-[var(--transition-base)] hover:border-[var(--color-border-strong)] hover:shadow-lg dark:bg-[var(--color-surface-elevated)]"
          >
            <Link href={builder.href} className="flex flex-1 flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={builder.preview}
                  alt={builder.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {builder.title}
                </h2>
                <p className="line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
                  {builder.tagline}
                </p>
              </div>
            </Link>
            <div className="px-4 py-3">
              <Link
                href={builder.href}
                className="inline-flex items-center text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                Open builder →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
