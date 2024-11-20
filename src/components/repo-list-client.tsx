"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, GitFork, Clock } from "lucide-react";
import { Repository } from "../types/repositories";

interface RepoListClientProps {
  repos: Repository[];
}

export function RepoListClient({ repos }: RepoListClientProps) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Private Repositories</CardTitle>
          <CardDescription>
            Please sign in to view your private repositories
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!repos || repos.length === 0) {
    return <p>No repositories available.</p>;
  }

  const handleViewOnGitHub = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Card className="mx-auto max-w-3xl my-8">
      <CardHeader>
        <CardTitle>Your Repositories</CardTitle>
        <CardDescription>
          Displaying {repos.length} repositories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {repos.map((repo) => (
            <Card key={repo.id} className="mb-4">
              <CardHeader>
                <CardTitle>{repo.name}</CardTitle>
                <CardDescription>
                  {repo.description || "No description provided"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Badge variant="secondary" className="flex items-center">
                    <Star className="mr-1 h-3 w-3" />
                    {repo.stargazers_count}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <GitFork className="mr-1 h-3 w-3" />
                    {repo.forks_count}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {repo.updated_at &&
                      new Date(repo.updated_at).toLocaleDateString()}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  onClick={() => handleViewOnGitHub(repo.html_url)}
                >
                  View on GitHub
                </Button>
              </CardFooter>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
