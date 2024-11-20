"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";

export default function Setup() {
  useEffect(() => {
    // Ensure this code runs only on the client
    if (window.opener) {
      window.opener.postMessage(
        "installation_completed",
        window.location.origin
      );
      // Optionally close the current window after sending the message
      window.close();
    }
  }, []);

  return (
    <Card>
      <p className="flex items-center">
        Redirecting to home page{" "}
        <Loader className="spin-in-2 ml-2 animate-spin" />
      </p>
    </Card>
  );
}
