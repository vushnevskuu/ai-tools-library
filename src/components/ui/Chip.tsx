import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export function Chip({ children, className }: ChipProps) {
  return (
    <Badge variant="secondary" className={cn("rounded-full font-medium", className)}>
      {children}
    </Badge>
  );
}
