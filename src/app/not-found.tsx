import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

export default function NotFound() {
  return (
    <PageContainer className="py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Page not found
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← Back to home
        </Link>
      </div>
    </PageContainer>
  );
}
