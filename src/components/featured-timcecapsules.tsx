"use client";

import { Carousel } from "./carousel";
import { Loader2 } from "lucide-react";
import { useTimeCapsules } from "@/hooks/featured-timecapsules";

export function FeaturedTimeCapsules() {
  const { data, isLoading, error } = useTimeCapsules();

  if (isLoading) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-6">Featured Time Capsules</h1> */}
      <Carousel
        microlearnings={data?.microlearning.items || []}
        type="featured"
      />
    </div>
  );
}
