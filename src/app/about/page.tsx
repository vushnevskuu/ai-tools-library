import { PageContainer } from "@/components/layout/PageContainer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <PageContainer className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          About
        </h1>
        <p className="mt-6 text-neutral-600 dark:text-neutral-400">
          AI Tools for Designers is a free, curated library of working AI assets
          for real design tasks. We focus on prompts, agents, templates, and
          rules that designers can use daily—for critique, direction, structure,
          transform, motion, resize, and workflow support.
        </p>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          The library is visual-first: you see the effect or output first,
          understand the use case second, and copy the asset third. No generic
          prompt dumps, no marketplace logic, no noise—just curated tools that
          work.
        </p>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Categories cover UI/UX, Brand/Visual, Motion/3D, Production/Resize,
          and Systems/Critique. Each tool includes metadata for tested-with,
          updated-at, and version, so you know what to expect.
        </p>
        <Link
          href="/explore"
          className="mt-8 inline-block text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Explore tools →
        </Link>
      </div>
    </PageContainer>
  );
}
