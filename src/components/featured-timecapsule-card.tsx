import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Star, Loader2, Power, Play } from "lucide-react";
import { Microlearning } from "../types/timecapsules";
import { useUserTimeCapsules } from "@/hooks/get-user-timecapsules";
import { useHandleTimeCapsule } from "@/hooks/use-handle-timecapsule";
import Link from "next/link";

import { useSession } from "next-auth/react";

interface FeaturedTimeCapsuleCardProps {
  microlearning: Microlearning;
}

export function FeaturedTimeCapsuleCard({
  microlearning,
}: FeaturedTimeCapsuleCardProps) {
  const { data: userTimeCapsules } = useUserTimeCapsules();
  const { handleStart, isPending } = useHandleTimeCapsule();
  const { data: session } = useSession();
  const loggedInUserId = session?.userId as string;

  const getIcon = (subtype: string) => {
    switch (subtype) {
      case "creator":
        return <Code className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const isOwnContent = microlearning.userid === loggedInUserId;
  const hasAccessed = userTimeCapsules?.microlearning.items.find(
    (item) => item.timecapsuleid === microlearning["userID#sessionID"]
  );

  return (
    <Card className="group flex flex-col justify-between w-full h-full overflow-hidden transition-all duration-500 hover:shadow-xl relative bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      <div className="absolute top-3 right-3 z-10">
        <Badge
          variant="secondary"
          className="bg-primary text-primary-foreground shadow-lg font-semibold px-3 py-1 cursor-pointer hover:bg-primary/90"
        >
          <Star className="h-3.5 w-3.5 mr-1 animate-pulse" />
          Featured
        </Badge>
      </div>

      <CardHeader className="pb-3 z-10">
        {" "}
        {/* Add z-10 to bring header above gradient */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-primary/10">
            {getIcon(microlearning.subtype)}
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight line-clamp-2 transition-colors duration-300 cursor-pointer ">
          <Link
            href={`/time-capsule/${encodeURIComponent(
              microlearning["userID#sessionID"]
            )}`}
            className="z-20" // Increase z-index to ensure it remains clickable
          >
            {microlearning.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="z-10">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {microlearning.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-4 border-t border-primary/10 z-10">
        <Badge
          variant="outline"
          className="capitalize font-medium border-primary/20"
        >
          {microlearning.subtype}
        </Badge>

        <Button
          className="transition-all duration-300 shadow-lg hover:shadow-xl z-10"
          onClick={() =>
            handleStart({
              userid: microlearning.userid,
              userIdSessionId: microlearning["userID#sessionID"],
            })
          }
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...
            </>
          ) : (
            <>
              {isOwnContent || hasAccessed ? (
                <>
                  <Play className="h-4 w-4 mr-2" /> Continue
                </>
              ) : (
                <>
                  <Power className="h-4 w-4 mr-2" /> Start Learning
                </>
              )}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default FeaturedTimeCapsuleCard;
