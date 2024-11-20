import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function DraftTimeCapsules() {
  const capsule = localStorage.getItem("parallel_micro_learning");
  const capsuleData = capsule ? JSON.parse(capsule) : null;
  const [userId, setUserId] = useState(capsuleData?.run_id);
  const [timeCapsuleId, setTimeCapsuleId] = useState(
    capsuleData?.userid_sessionid
  );
  const [mode, setMode] = useState(capsuleData?.mode);

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await axios(
        `${process.env.NEXT_PUBLIC_BUBBLE_API_URL}/runtimecapsule`,
        {
          method: "POST",
          data: {
            userid: userId,
            timecapsuleid: timeCapsuleId,
            mode: mode,
          },
        }
      );
      return response.data;
    },
  });

  const handleRun = () => {
    mutate();
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Draft Time Capsules</h2>

      {capsuleData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardDescription className="flex flex-col gap-2">
                <Input
                  placeholder="User Id"
                  defaultValue={capsuleData.run_id}
                  onChange={(e) => setUserId(e.target.value)}
                />
                <Input
                  placeholder="Time Capsule Id"
                  defaultValue={capsuleData.userid_sessionid}
                  onChange={(e) => setTimeCapsuleId(e.target.value)}
                />

                <Input
                  placeholder="Mode"
                  onChange={(e) => setMode(e.target.value)}
                />
              </CardDescription>
              <CardFooter>
                <Button className="mt-2 w-full" onClick={handleRun}>
                  Run
                </Button>
              </CardFooter>
            </CardHeader>
          </Card>
        </div>
      ) : (
        <div>No draft time capsule found</div>
      )}
    </section>
  );
}
