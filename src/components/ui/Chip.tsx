interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export function Chip({ children, className = "" }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 ${className}`}
    >
      {children}
    </span>
  );
}
