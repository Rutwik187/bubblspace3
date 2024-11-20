"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getInstallationId } from "@/app/actions/github";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Github, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function GitHubAppInstall() {
  const { data: session, status } = useSession();
  const [installationId, setInstallationId] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (session) {
      checkInstallation();
    }
  }, [session]);

  const checkInstallation = async () => {
    setIsChecking(true);
    try {
      const id = await getInstallationId();
      setInstallationId(id);
      if (id) {
        toast({
          title: "GitHub App Installed",
          description: "The GitHub App is successfully installed.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error checking installation:", error);
      toast({
        title: "Error",
        description: "Failed to check GitHub App installation status.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleInstall = () => {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      `https://github.com/apps/aiedx-github-app/installations/new`,
      "Install GitHub App",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return; // ignore messages from unknown origins
      }

      if (event.data === "installation_completed") {
        // Close the popup when installation is completed
        popup?.close();
        // Redirect or reload the home page
        window.location.href = "/";
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup the event listener when the popup is closed
    const interval = setInterval(() => {
      if (popup?.closed) {
        window.removeEventListener("message", handleMessage);
        clearInterval(interval);
      }
    }, 1000);
  };

  if (status === "loading") {
    return (
      <Card className="w-[350px] mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>GitHub App Installation</CardTitle>
          <CardDescription>
            Please sign in to install the GitHub App
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>GitHub App Installation</CardTitle>
        <CardDescription>
          {installationId
            ? "GitHub App is installed"
            : "Install the GitHub App to continue"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isChecking ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : installationId ? (
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>GitHub App is installed</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-yellow-600">
              <XCircle className="h-5 w-5" />
              <span>GitHub App is not installed</span>
            </div>
            <Button onClick={handleInstall} className="w-full">
              <Github className="mr-2 h-4 w-4" />
              Install GitHub App
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
