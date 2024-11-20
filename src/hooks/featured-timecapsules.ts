"use client";

import { useQuery } from "@tanstack/react-query";
import { Microlearning } from "../types/timecapsules";
import axios from "axios";
import { apiKeyManager } from "@/lib/api-key-manager";
import { fetchWithRetry } from "@/lib/api-retry";

interface TimeCapsuleResponse {
  microlearning: {
    items: Microlearning[];
  };
}

async function fetchFeaturedTimeCapsules() {
  return fetchWithRetry(
    `${process.env.NEXT_PUBLIC_BUBBLE_API_URL}/getbubblmarket?subtype=creator&status=published,featured`,
    "getbubblmarket"
  );
}

export function useTimeCapsules() {
  return useQuery<TimeCapsuleResponse, Error>({
    queryKey: ["featured-time-capsules"],
    queryFn: fetchFeaturedTimeCapsules,
  });
}
