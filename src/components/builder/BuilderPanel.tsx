"use client";

import { type ReactNode } from "react";

interface BuilderPanelProps {
  children: ReactNode;
  className?: string;
  /** Optional header content (tabs, title) */
  header?: ReactNode;
  /** Optional footer content (actions) */
  footer?: ReactNode;
  /** Scrollable body */
  scrollable?: boolean;
}

/**
 * Shared panel shell for Design System Builder.
 * Uses site tokens: --radius-lg, --color-border, --color-surface, --space-card.
 */
export function BuilderPanel({
  children,
  className = "",
  header,
  footer,
  scrollable = false,
}: BuilderPanelProps) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-elevated)] ${className}`}
    >
      {header && (
        <div className="shrink-0 border-b border-[var(--color-border)]">
          {header}
        </div>
      )}
      <div
        className={`flex-1 p-[var(--space-card)] ${scrollable ? "min-h-0 overflow-y-auto" : ""}`}
      >
        {children}
      </div>
      {footer && (
        <div className="shrink-0 border-t border-[var(--color-border)] p-[var(--space-card)]">
          {footer}
        </div>
      )}
    </div>
  );
}
