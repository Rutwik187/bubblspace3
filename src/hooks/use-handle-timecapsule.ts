import { useRouter } from "next/navigation";
import { useUserTimeCapsules } from "@/hooks/get-user-timecapsules";
import { useRunTimeCapsule } from "@/hooks/run-timecapsule";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

interface HandleStartParams {
  userid: string;
  userIdSessionId: string;
}

interface UseHandleTimeCapsuleReturn {
  handleStart: (params: HandleStartParams) => void;
  isPending: boolean;
}

export const useHandleTimeCapsule = (): UseHandleTimeCapsuleReturn => {
  const router = useRouter();
  const { data: session } = useSession();
  const loggedInUserId = session?.userId as string;
  const { data: userTimeCapsules } = useUserTimeCapsules();

  const { mutate: runTimeCapsule, isPending } = useRunTimeCapsule();

  const handleStart = ({ userid, userIdSessionId }: HandleStartParams) => {
    // Case 1: User's own content
    if (userid === loggedInUserId) {
      router.push(
        `/time-capsule/${encodeURIComponent(
          userIdSessionId
        )}/${encodeURIComponent(loggedInUserId)}`
      );
      return;
    }

    // Case 2: Previously accessed content
    const existingTimeCapsule = userTimeCapsules?.microlearning.items.find(
      (item) => item.timecapsuleid === userIdSessionId
    );

    if (existingTimeCapsule) {
      const userTimeCapsuleUserIdSessionId =
        existingTimeCapsule["userID#sessionID"] || "";
      router.push(
        `/time-capsule/${encodeURIComponent(
          userTimeCapsuleUserIdSessionId
        )}/${encodeURIComponent(loggedInUserId)}`
      );
      return;
    }

    // Case 3: New content that needs to be run
    runTimeCapsule(
      {
        userid: loggedInUserId,
        userIdSessionId,
        mode: "run",
      },
      {
        onSuccess: (data) => {
          router.push(
            `/time-capsule/${encodeURIComponent(
              data.userid_sessionid
            )}/${encodeURIComponent(userid)}`
          );
        },
        onError: (error) => {
          console.error("Error running time capsule:", error);
          toast({
            title: "Error running time capsule",
            description: "Please try again later",
          });
        },
      }
    );
  };

  return { handleStart, isPending };
};
