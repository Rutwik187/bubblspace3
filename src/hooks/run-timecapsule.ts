import { useMutation } from "@tanstack/react-query";
import { fetchWithRetry } from "@/lib/api-retry";

const runTimeCapsule = async ({
  userid,
  userIdSessionId,
  mode,
}: {
  userid: string;
  userIdSessionId: string;
  mode: string;
}) => {
  return fetchWithRetry(
    `${process.env.NEXT_PUBLIC_BUBBLE_API_URL}/runtimecapsule`,
    "runtimecapsule",
    {
      method: "POST",
      data: {
        userid,
        timecapsuleid: userIdSessionId,
        mode,
      },
    }
  );
};

export const useRunTimeCapsule = () => {
  return useMutation({
    mutationFn: runTimeCapsule,
  });
};
