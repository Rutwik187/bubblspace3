"use client";

import { useQuery } from "@tanstack/react-query";
import { Microlearning } from "../types/timecapsules";

import { fetchWithRetry } from "@/lib/api-retry";

import { useSession } from "next-auth/react";

interface TimeCapsuleResponse {
  microlearning: {
    items: Microlearning[];
  };
}

async function fetchUserTimeCapsules(loggedInUserId: string) {
  return fetchWithRetry(
    `${process.env.NEXT_PUBLIC_BUBBLE_API_URL}/getalltimecapsule?userid=${loggedInUserId}`,
    "getalltimecapsule"
  );
}

export function useUserTimeCapsules() {
  const { data: session } = useSession();
  const loggedInUserId = session?.userId as string;

  console.log("ses", loggedInUserId);
  return useQuery<TimeCapsuleResponse, Error>({
    queryKey: ["user-time-capsules"],
    queryFn: () => fetchUserTimeCapsules(loggedInUserId),
  });
}
