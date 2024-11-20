import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInCard() {
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Sign In Required</CardTitle>
        <CardDescription>
          Please sign in to view your time capsule
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => signIn()} className="w-full">
          Sign In
        </Button>
      </CardContent>
    </Card>
  );
}
