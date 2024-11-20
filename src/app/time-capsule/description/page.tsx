"use client";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  ExternalLinkIcon,
  GithubIcon,
  LinkIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LinkMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  loading?: boolean;
  error?: boolean;
  isGitHub?: boolean;
  stats?: {
    contributors?: number;
    issues?: number;
    stars?: number;
    forks?: number;
  };
}

function GitHubPreview({ metadata }: { metadata: LinkMetadata }) {
  const fetchTimeCapsuleDescription = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BUBBLE_API_URL}/getbubblmarketsinglebtc?userID_sessionID=9ca76cb0fe8dd00639d05e9c3#7349e419-c25b-4835-9825-dd553933b885`
    );
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ["fetch-timecapsuel-description"],
    queryFn: () => fetchTimeCapsuleDescription(),
  });

  console.log("data", data);

  const repoPath = metadata.url.replace("https://github.com/", "");

  return (
    <Card className="max-w-md overflow-hidden hover:shadow-md transition-all duration-200 group">
      <Link
        href={metadata.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm mb-2">
            <GithubIcon className="h-4 w-4" />
            <span className="font-medium text-muted-foreground">GitHub</span>
          </div>

          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="space-y-1.5">
              <h3 className="font-semibold group-hover:text-blue-500 transition-colors">
                {repoPath}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {metadata.description}
              </p>
            </div>
          </div>
          <div className="relative size-24 rounded-lg overflow-hidden bg-muted   w-full h-[9rem] md:h-[13rem]">
            <Image src={metadata.image} alt="" fill className="object-cover" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

function StandardLinkPreview({ metadata }: { metadata: LinkMetadata }) {
  return (
    <Card className="max-w-md overflow-hidden hover:shadow-md transition-all duration-200 group">
      <Link
        href={metadata.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="grid grid-cols-[120px,1fr] h-[120px]">
          <div className="relative bg-muted">
            <Image
              src={metadata.image}
              alt=""
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <LinkIcon className="h-3 w-3" />
              <span>{new URL(metadata.url).hostname}</span>
            </div>
            <h3 className="font-semibold line-clamp-1 group-hover:text-blue-500 transition-colors">
              {metadata.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {metadata.description}
            </p>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}

function LinkPreview({ url }: { url: string }) {
  const [metadata, setMetadata] = useState<LinkMetadata>({
    title: "",
    description: "",
    image: "",
    url: url,
    loading: true,
    isGitHub: url.startsWith("https://github.com/"),
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          `https://api.microlink.io?url=${encodeURIComponent(url)}`
        );
        const data = await response.json();

        if (data.status === "success") {
          setMetadata({
            title: data.data.title || "",
            description: data.data.description || "",
            image:
              data.data.image?.url || "/placeholder.svg?height=400&width=600",
            url: url,
            loading: false,
            isGitHub: url.startsWith("https://github.com/"),
          });
        } else {
          setMetadata((prev) => ({ ...prev, loading: false, error: true }));
        }
      } catch (error) {
        setMetadata((prev) => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchMetadata();
  }, [url]);

  if (metadata.loading) {
    return (
      <Card className="max-w-md overflow-hidden animate-pulse">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 w-4 bg-muted rounded"></div>
            <div className="h-4 w-16 bg-muted rounded"></div>
          </div>

          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
            <div className="w-16 h-16 rounded-lg bg-muted shrink-0"></div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-3 bg-muted rounded w-8"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (metadata.error) {
    return null;
  }

  return metadata.isGitHub ? (
    <GitHubPreview metadata={metadata} />
  ) : (
    <StandardLinkPreview metadata={metadata} />
  );
}

export default function TimecapsuleInfo() {
  const timecapsule = {
    title: "The Future of AI in 2030",
    author: "Dr. Jane Smith",
    userGithub: "https://github.com/thefirehacker",
    description:
      "This timecapsule explores the potential advancements and impacts of Artificial Intelligence by the year 2030, covering various sectors including healthcare, education, and transportation.",
    createdDate: "2023-05-15",
    sections: [
      "AI Roadmap",
      "Technology Quiz",
      "Use Cases",
      "Expert Interviews",
      "Ethical Considerations",
    ],
    citations: [
      "https://github.com/thefirehacker/Sarvam_ShukaV1_Demo",
      "https://www.linkedin.com/in/thefirehacker",
    ],
    additionalInfo:
      "This timecapsule is a comprehensive exploration of AI's future, providing insights into its potential impacts across multiple industries.",
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary" className="mb-2">
              Timecapsule
            </Badge>
            <CardTitle className="text-4xl font-bold">
              {timecapsule.title}
            </CardTitle>
            <CardDescription className="text-lg">
              By {timecapsule.author}
            </CardDescription>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="w-full">
              <LinkPreview url={timecapsule.userGithub} />
            </div>
            <Button size="lg" className="w-full sm:w-auto">
              Run Timecapsule
              <ExternalLinkIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Description</h3>
            <Separator />
            <p className="text-muted-foreground leading-relaxed">
              {timecapsule.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Sections</h3>
            <Separator />
            <div className="flex flex-wrap gap-2">
              {timecapsule.sections.map((section, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-4 py-1.5 text-sm"
                >
                  {section}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Citations</h3>
            <Separator />
            <ScrollArea className="h-auto max-h-[600px] w-full rounded-md">
              <div className="space-y-6 pr-4">
                {timecapsule.citations.map((citation, index) => (
                  <div key={index} className="space-y-3">
                    <LinkPreview url={citation} />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Additional Information</h3>
            <Separator />
            <p className="text-muted-foreground leading-relaxed">
              {timecapsule.additionalInfo}
            </p>
          </div>
        </CardContent>

        <Separator className="my-4" />

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted-foreground py-6">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Created on {timecapsule.createdDate}
          </div>
          <div className="flex items-center">
            <BookOpenIcon className="mr-2 h-4 w-4" />
            {timecapsule.sections.length} Sections
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4" />
            Last updated: 2 days ago
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
