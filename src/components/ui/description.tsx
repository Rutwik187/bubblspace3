import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

const Description: React.FC<DescriptionProps> = ({
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400";

  return (
    <p className={cn(baseStyles, className)} {...props}>
      {children}
    </p>
  );
};

export default Description;
