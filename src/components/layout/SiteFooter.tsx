import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Free curated library of AI tools for designers.
          </p>
          <nav className="flex gap-6">
            <Link
              href="/explore"
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
