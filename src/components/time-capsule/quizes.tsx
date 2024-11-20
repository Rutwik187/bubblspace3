"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type QuestionType = {
  questionId: string;
  type: "multipleChoice" | "trueFalse" | "codingChallenge";
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  starterCode?: string;
  solution?: string;
};

type QuizProps = {
  questions: QuestionType[];
};

export default function Quiz({ questions }: QuizProps) {
  console.log(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(
    null
  );
  const [showResult, setShowResult] = useState(false);
  const [userCode, setUserCode] = useState("");

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string | boolean) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserCode("");
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "multipleChoice":
        return (
          <div className="space-y-2">
            {currentQuestion.options?.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                variant={
                  selectedAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? "default"
                      : "destructive"
                    : "outline"
                }
                className="w-full justify-start"
                disabled={showResult}
              >
                {option}
              </Button>
            ))}
          </div>
        );
      case "trueFalse":
        return (
          <div className="space-x-2">
            <Button
              onClick={() => handleAnswer(true)}
              variant={
                selectedAnswer === true
                  ? currentQuestion.correctAnswer === true
                    ? "default"
                    : "destructive"
                  : "outline"
              }
              disabled={showResult}
            >
              True
            </Button>
            <Button
              onClick={() => handleAnswer(false)}
              variant={
                selectedAnswer === false
                  ? currentQuestion.correctAnswer === false
                    ? "default"
                    : "destructive"
                  : "outline"
              }
              disabled={showResult}
            >
              False
            </Button>
          </div>
        );
      case "codingChallenge":
        return (
          <div className="space-y-2">
            <Textarea
              value={userCode || currentQuestion.starterCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="font-mono"
              rows={10}
            />
            <Button
              onClick={() => handleAnswer(userCode)}
              disabled={showResult}
            >
              Submit Code
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!showResult) return null;

    if (currentQuestion.type === "codingChallenge") {
      return (
        <div className="mt-4">
          <h3 className="font-semibold">Solution:</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 overflow-x-auto">
            <code>{currentQuestion.solution}</code>
          </pre>
        </div>
      );
    }

    return (
      <p
        className={`mt-4 ${
          selectedAnswer === currentQuestion.correctAnswer
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {selectedAnswer === currentQuestion.correctAnswer
          ? "Correct!"
          : `Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`}
      </p>
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{currentQuestion.question}</p>
        {renderQuestion()}
        {renderResult()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => setCurrentQuestionIndex((prevIndex) => prevIndex - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNextQuestion}
          disabled={
            currentQuestionIndex === questions.length - 1 || !showResult
          }
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
