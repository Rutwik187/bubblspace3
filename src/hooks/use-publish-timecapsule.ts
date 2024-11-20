import { fetchWithRetry } from "@/lib/api-retry";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PublishMutationParams {
  userID_sessionID: string;
  userid: string;
  status: string;
}

export const usePublishTimeCapsule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userID_sessionID,
      userid,
      status,
    }: PublishMutationParams) => {
      const response = await fetchWithRetry(
        `${process.env.NEXT_PUBLIC_BUBBLE_API_URL}/publishtimecapsule`,
        "publishtimecapsule",
        {
          method: "POST",
          data: {
            userID_sessionID,
            userid,
            status,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to publish time capsule");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeCapsules"] });
    },
  });
};
