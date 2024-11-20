"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { usePublishTimeCapsule } from "@/hooks/use-publish-timecapsule";
import { Microlearning } from "../types/timecapsules";
import { PublishSuccessDialog } from "./publish-success-dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  Code,
  Clock,
  Play,
  MoreHorizontal,
  Share,
  Edit,
  Trash,
} from "lucide-react";

interface UserTimeCapsuleCardProps {
  microlearning: Microlearning;
}

export function UserTimeCapsuleCard({
  microlearning,
}: UserTimeCapsuleCardProps) {
  const [showPublishSuccess, setShowPublishSuccess] = useState(false);
  const router = useRouter();
  const publishMutation = usePublishTimeCapsule();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-800 hover:bg-green-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800 hover:bg-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800 hover:bg-blue-200";
    }
  };

  const handleContinue = ({
    userid,
    userIdSessionId,
  }: {
    userid: string;
    userIdSessionId: string;
  }) => {
    router.push(
      `/time-capsule/${encodeURIComponent(userIdSessionId)}/${userid}`
    );
  };

  const handlePublish = async () => {
    try {
      await publishMutation.mutateAsync({
        userID_sessionID: microlearning["userID#sessionID"],
        userid: microlearning.userid,
        status: "published",
      });
      setShowPublishSuccess(true);
    } catch (error) {
      console.error("Failed to publish:", error);
    }
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Share functionality to be implemented");
  };

  const handleEdit = () => {
    // Implement edit functionality
    console.log("Edit functionality to be implemented");
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log("Delete functionality to be implemented");
  };

  return (
    <>
      <Card className="w-full h-full overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col justify-between bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Badge
                className={`${getStatusColor(
                  microlearning.status
                )} font-semibold text-xs px-2 py-1 rounded-full `}
              >
                {microlearning.status}
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={handleShare}>
                  <Share className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                {microlearning.status === "draft" && (
                  <DropdownMenuItem onSelect={handlePublish}>
                    <Play className="mr-2 h-4 w-4" />
                    <span>Unpublish</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onSelect={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={handleDelete}
                  className="text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardTitle className="text-xl font-bold line-clamp-2">
            <Link
              href={`/time-capsule/${encodeURIComponent(
                microlearning["userID#sessionID"]
              )}`}
            >
              {microlearning.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {microlearning.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center text-sm font-normal text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              {microlearning.status === "draft" ? "Draft" : "2 days ago"}
            </span>
          </div>
          <Button
            onClick={() =>
              handleContinue({
                userid: microlearning.userid,
                userIdSessionId: microlearning["userID#sessionID"],
              })
            }
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Play className="h-4 w-4 mr-2" />
            <span>Continue</span>
          </Button>
        </CardFooter>
      </Card>

      <PublishSuccessDialog
        isOpen={showPublishSuccess}
        onClose={() => setShowPublishSuccess(false)}
        microlearning={microlearning}
        onContinue={handleContinue}
      />
    </>
  );
}
