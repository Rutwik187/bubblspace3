"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Quiz from "@/components/time-capsule/quizes";
import Roadmap from "@/components/time-capsule/roadmap";
import Content from "@/components/time-capsule/content";
import { useQuery } from "@tanstack/react-query";

import { fetchWithRetry } from "@/lib/api-retry";
import { useSession } from "next-auth/react";

async function getMicrolearning(userId_sessionId: string, userId: string) {
  return fetchWithRetry(
    `${process.env.NEXT_PUBLIC_BUBBLE_API_URL}/get_microlearning?userID_sessionID=${userId_sessionId}&userid=${userId}`,
    "get_microlearning"
  );
}

export default function TimeCapsule({
  params,
}: {
  params: { userId_sessionId: string };
}) {
  const { data: session } = useSession();
  const loggedInUserId = session?.userId as string;
  const { userId_sessionId } = params;
  const [currentStep, setCurrentStep] = useState(0);

  const { data: microlearningData, isLoading } = useQuery({
    queryKey: ["microlearningData", userId_sessionId, loggedInUserId],
    queryFn: () => getMicrolearning(userId_sessionId, loggedInUserId),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Generating MicroLearning...
      </div>
    );

  const totalSteps = 3;

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="h-[500px] w-full">
            <Roadmap roadmap={microlearningData.microLearningReactflow} />
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <Content useCase={microlearningData.Usecase.useCase} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Quiz questions={microlearningData.Quiz.questions} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{microlearningData.title}</CardTitle>
          <CardDescription>{microlearningData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress
            value={((currentStep + 1) / totalSteps) * 100}
            className="mb-4"
          />
          <div className="mb-6">{renderStep()}</div>
          <div className="flex justify-between">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === totalSteps - 1}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
