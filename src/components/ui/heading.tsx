import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, className, ...props }) => {
  const baseStyles =
    "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center my-4";

  return (
    <h2 className={cn(baseStyles, className)} {...props}>
      {children}
    </h2>
  );
};

export default Heading;
