"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

// Define types for the repository data
interface Repository {
  name: string;
  description: string;
  topics: string[];
}

// Sample data for GitHub repositories
const repositories: Repository[] = [
  {
    name: "Frontend",
    description: "A comprehensive and practical guide for beginners",
    topics: ["React", "Javascript", "Next.js"],
  },
  {
    name: "Backend",
    description: "Learn server-side programming with best practices",
    topics: ["Node.js", "Express", "Databases"],
  },
  {
    name: "Machine Learning",
    description: "Introduction to machine learning and neural networks",
    topics: ["Python", "TensorFlow", "PyTorch"],
  },
  {
    name: "DevOps",
    description: "Manage and automate your infrastructure",
    topics: ["Docker", "Kubernetes", "CI/CD"],
  },
  {
    name: "Cybersecurity",
    description: "Stay secure with modern security practices",
    topics: ["Encryption", "Network Security", "Penetration Testing"],
  },
];

interface RepoCardProps {
  repo: Repository;
}

function RepoCard({ repo }: RepoCardProps) {
  return (
    <Link href="/roadmap">
      <Card className="w-[300px] h-[200px] cursor-pointer">
        <CardHeader>
          <CardTitle>{repo.name}</CardTitle>
          <CardDescription>{repo.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {repo.topics.map((topic, index) => (
              <Badge key={index}>{topic}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function GitHubReposCarousel() {
  return (
    <div className="w-full max-w-5xl mx-auto py-10">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {repositories.map((repo) => (
            <CarouselItem key={repo.name} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <RepoCard repo={repo} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
