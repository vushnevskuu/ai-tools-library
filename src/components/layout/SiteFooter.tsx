import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[var(--color-text-muted)]">
            Free curated library of AI tools for designers. © {year}
          </p>
          <nav className="flex gap-6">
            <Link
              href="/explore"
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              Explore
            </Link>
            <Link
              href="/builders"
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              Builders
            </Link>
            <a
              href="https://github.com/vushnevskuu/ai-tools-library"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              GitHub
            </a>
            <Link
              href="/about"
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
