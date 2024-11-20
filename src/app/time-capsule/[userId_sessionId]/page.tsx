"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  Github,
  Link as LinkIcon,
  Twitter,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fetchWithRetry } from "@/lib/api-retry";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import ShareDialog from "@/components/share";

type TimecapsuleData = {
  run_id: string;
  status: string;
  subtype: string;
  link1: string;
  githublink: string;
  link1_metadata: string;
  Timestamp: string;
  githubusername: string;
  userid: string;
  category: string;
  github_metadata: string;
  description: string;
  actions: string;
  title: string;
  type: string;
  "userID#sessionID": string;
};

function LinkPreview({ url, metadata }: { url: string; metadata: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["linkPreview", url],
    queryFn: async () => {
      if (metadata) return JSON.parse(metadata);
      const response = await axios.get(
        `https://api.microlink.io?url=${encodeURIComponent(url)}`
      );
      return response.data.data;
    },
    enabled: !metadata,
  });

  if (isLoading) {
    return <Skeleton className="h-24 w-full" />;
  }

  if (isError) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4 flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          Failed to load preview
        </CardContent>
      </Card>
    );
  }

  const icon = url.includes("github.com") ? (
    <Github className="h-4 w-4" />
  ) : url.includes("x.com") || url.includes("twitter.com") ? (
    <Twitter className="h-4 w-4" />
  ) : (
    <LinkIcon className="h-4 w-4" />
  );

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 group">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="grid grid-cols-[120px,1fr] h-[120px]">
          <div className="relative bg-muted">
            <Image
              src={data?.image?.url || "/placeholder.svg?height=120&width=120"}
              alt=""
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              {icon}
              <span>{new URL(url).hostname}</span>
            </div>
            <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
              {data?.title || url}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {data?.description || "No description available"}
            </p>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}

export default function TimecapsulePage({
  params,
}: {
  params: { userId_sessionId: string };
}) {
  const { userId_sessionId } = params;
  const { data: session } = useSession();

  async function getTimecapsuleDetails(userId_sessionId: string) {
    return fetchWithRetry(
      `${process.env.NEXT_PUBLIC_BUBBLE_API_URL}/getbubblmarketsinglebtc?userID_sessionID=${userId_sessionId}`,
      "getbubblmarketsinglebtc"
    );
  }

  const { data, isLoading, isError } = useQuery<TimecapsuleData>({
    queryKey: ["timecapsule", userId_sessionId],
    queryFn: () => getTimecapsuleDetails(userId_sessionId),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-1/4 mb-2" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-8">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-4xl mx-auto bg-red-50 border-red-200">
          <CardContent className="p-8 flex flex-col items-center text-red-700">
            <AlertCircle className="w-12 h-12 mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Error Loading Timecapsule
            </h2>
            <p>
              We couldn&apos;t retrieve the timecapsule data. Please try again
              later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">
                {data.category}
              </Badge>
              <CardTitle className="text-4xl font-bold text-primary">
                {data.title}
              </CardTitle>
              <CardDescription className="text-lg">
                By{" "}
                <Link
                  href={`https://github.com/${data.githubusername}`}
                  className="font-medium hover:underline"
                >
                  {data.githubusername}
                </Link>
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <ShareDialog />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Unpublish</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="w-full">
              <LinkPreview
                url={data.githublink}
                metadata={data.github_metadata}
              />
            </div>
            <Link
              href={`/time-capsule/${encodeURIComponent(
                userId_sessionId
              )}/${encodeURIComponent(session?.userId as string)}`}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Explore Timecapsule
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Description</h3>
            <Separator />
            <p className="text-muted-foreground leading-relaxed">
              {data.description}
            </p>
          </div>

          {data.actions && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Actions</h3>
              <Separator />
              <p className="text-muted-foreground leading-relaxed">
                {data.actions}
              </p>
            </div>
          )}

          {data.link1 && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Additional Resource</h3>
              <Separator />
              <ScrollArea className="h-auto max-h-[600px] w-full rounded-md">
                <div className="space-y-6 pr-4">
                  <LinkPreview
                    url={data.link1}
                    metadata={data.link1_metadata}
                  />
                </div>
              </ScrollArea>
            </div>
          )}
        </CardContent>

        <Separator className="my-4" />

        <CardFooter className="flex flex-wrap justify-between gap-4 text-sm text-muted-foreground py-6">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Created on {new Date(data.Timestamp).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            {data.type} - {data.subtype}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Status:{" "}
            <Badge variant="outline" className="ml-1">
              {data.status}
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
