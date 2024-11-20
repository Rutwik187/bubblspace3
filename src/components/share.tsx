"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link2,
  Share2,
  Check,
  PhoneIcon as WhatsApp,
} from "lucide-react";

export default function ShareDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  const shareUrl = "https://example.com/share";
  const shareTitle = "Check out this awesome content!";
  const shareText =
    "I found this interesting content that I wanted to share with you.";

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#1877F2] hover:bg-[#0E65E5]",
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-[#1DA1F2] hover:bg-[#0C90E0]",
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-[#0A66C2] hover:bg-[#0958A8]",
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: "WhatsApp",
      icon: WhatsApp,
      color: "bg-[#25D366] hover:bg-[#20BD5A]",
      shareUrl: `https://wa.me/?text=${encodeURIComponent(
        `${shareText} ${shareUrl}`
      )}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-[#EA4335] hover:bg-[#D33C2D]",
      shareUrl: `mailto:?subject=${encodeURIComponent(
        shareTitle
      )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
    },
  ];

  const handleShare = async (platform: string) => {
    const platformData = socialPlatforms.find((p) => p.name === platform);

    if (platform === "Email") {
      window.location.href = platformData?.shareUrl || "";
      setIsOpen(false);
      return;
    }

    // Try using Web Share API for mobile devices if available
    if (
      navigator.share &&
      (platform === "WhatsApp" || platform === "Twitter")
    ) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        toast({
          title: "Shared successfully!",
          description: `Content shared via native share dialog.`,
        });
      } catch (error) {
        // Fall back to URL-based sharing if Web Share API fails or is declined
        window.open(platformData?.shareUrl, "_blank", "noopener,noreferrer");
      }
    } else {
      // Open sharing URL in a new window for other platforms
      const width = 600;
      const height = 400;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;

      window.open(
        platformData?.shareUrl,
        `Share on ${platform}`,
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
      );
    }

    toast({
      title: "Sharing initiated!",
      description: `Opening share dialog for ${platform}.`,
    });
    setIsOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast({
        title: "Link copied!",
        description: "The share link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy the link. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Share this content
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {socialPlatforms.map((platform) => (
              <Button
                key={platform.name}
                variant="outline"
                className={`gap-2 transition-all ${platform.color} text-white hover:text-white`}
                onClick={() => handleShare(platform.name)}
              >
                <platform.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{platform.name}</span>
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Input
              readOnly
              value={shareUrl}
              className="flex-1 bg-muted px-3 py-2 text-sm"
            />
            <Button
              onClick={copyToClipboard}
              className={`px-3 transition-all ${
                isCopied
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              <span className="sr-only">{isCopied ? "Copied" : "Copy"}</span>
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
