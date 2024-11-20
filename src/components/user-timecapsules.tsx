"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { SignInCard } from "./sign-in-card";
import { Carousel } from "./carousel";
import { Loader, Loader2 } from "lucide-react";
import { useUserTimeCapsules } from "@/hooks/get-user-timecapsules";

export function UserTimeCapsules() {
  const { data: session, status } = useSession();

  const { data, isLoading, error } = useUserTimeCapsules();

  if (status === "loading") {
    return <Loader2 className="h-4 w-4 animate-spin" />;
  }

  if (status === "unauthenticated") {
    return <SignInCard />;
  }

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
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
      <Carousel
        microlearnings={data?.microlearning.items || []}
        type="user-time"
      />
    </div>
  );
}
