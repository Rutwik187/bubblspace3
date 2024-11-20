import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-full w-full flex items-center justify-center",
        className
      )}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  );
}
