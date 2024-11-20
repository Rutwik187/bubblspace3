"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Folder, File, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastAction } from "@/components/ui/toast";
import { CreateMicroLearningResponse } from "@/types/api-responses";
import { fetchWithRetry } from "@/lib/api-retry";
import { floatingCardStore } from "@/store/progress-floating-card";

export function CreateTimeCapsuleDialog() {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [links, setLinks] = useState<string[]>([""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General Purpose");
  const [githublink, setGithublink] = useState("");
  const [link1, setLink1] = useState("");
  const [actions, setActions] = useState("");
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<
    { name: string; path: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const {
    setIsCreating,
    setProgress,
    setTitle: setTimeCapsuleTitle,
  } = floatingCardStore();

  const mutation = useMutation<CreateMicroLearningResponse, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      setIsCreating(true);
      setTimeCapsuleTitle(formData.get("title") as string);
      setProgress(0);

      const simulationDuration = 120000; // 2 minutes in milliseconds
      const updateInterval = 1000; // Update every second
      const totalSteps = simulationDuration / updateInterval;

      let step = 0;
      const progressInterval = setInterval(() => {
        step++;
        const newProgress = (step / totalSteps) * 100;
        setProgress(Math.min(newProgress, 95));
        if (step >= totalSteps) {
          clearInterval(progressInterval);
        }
      }, updateInterval);

      try {
        const response = await fetchWithRetry(
          `${process.env.NEXT_PUBLIC_BUBBLE_API_URL}/create_parallel_micro_learning`,
          "create_microlearning",
          {
            method: "POST",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        clearInterval(progressInterval);
        setProgress(100);
        return response;
      } catch (error) {
        clearInterval(progressInterval);
        setIsCreating(false);
        setProgress(0);
        throw error;
      }
    },
    onSuccess: (data) => {
      setIsFormOpen(false);
      toast({
        title: "Time Capsule Created",
        description: "Your time capsule has been created successfully",
        action: (
          <ToastAction
            altText="Run Time Capsule"
            onClick={() => {
              router.push(
                `/time-capsule/${encodeURIComponent(
                  data.userid_sessionid
                )}/${encodeURIComponent(session?.userId as string)}`
              );
            }}
          >
            Run Time Capsule
          </ToastAction>
        ),
      });
      setTimeout(() => {
        setIsCreating(false);
        setProgress(0);
      }, 2000);
    },
    onError: (error) => {
      console.log("Error creating time capsule", error);
      toast({
        title: "Error",
        description:
          "An error occurred while creating your time capsule. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsFormOpen(false);

    const formData = new FormData();
    formData.append("datalocation", "s3");
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("githublink", githublink);
    formData.append("link1", link1);
    formData.append("actions", actions);

    if (fileInputRef.current?.files) {
      Array.from(fileInputRef.current.files).forEach((file) => {
        formData.append("files", file);
      });
    }

    if (folderInputRef.current?.files) {
      Array.from(folderInputRef.current.files).forEach((file) => {
        formData.append("folders", file);
      });
    }

    links.forEach((link, index) => {
      if (link) {
        formData.append(`links[${index}]`, link);
      }
    });

    mutation.mutate(formData);
  };

  const addLink = () => {
    setLinks([...links, ""]);
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const items = Array.from(files).map((file) => ({
        name: file.name,
        path: file.webkitRelativePath || file.name,
      }));
      setSelectedItems(items);
    }
  };

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <Button>Create New Time Capsule</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New AI Agent Time Capsule</DialogTitle>
          <DialogDescription>
            Fill in the details to create your new AI Agent Time Capsule.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter title for your AI Agent"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="Enter description for your AI Agent"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <div className="col-span-3">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Purpose">
                      General Purpose
                    </SelectItem>
                    <SelectItem value="Full Stack Development">
                      Full Stack Development
                    </SelectItem>
                    <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="Business Development">
                      Business Development
                    </SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="LLM">LLM</SelectItem>
                    <SelectItem value="Dev Tools">Dev Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="training-data" className="text-right">
                Training Data
              </Label>
              <div className="col-span-3 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
                <input
                  ref={folderInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <File className="mr-2 h-4 w-4" /> Select Files
                </Button>
                <Button
                  type="button"
                  onClick={() => folderInputRef.current?.click()}
                  className="w-full"
                >
                  <Folder className="mr-2 h-4 w-4" /> Select Folders
                </Button>
              </div>
            </div>

            {selectedItems.length > 0 && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Selected Files</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 mt-2">
                    {selectedItems.slice(0, 5).map((item, index) => (
                      <li key={index}>{item.path}</li>
                    ))}
                    {selectedItems.length > 5 && (
                      <li>... and {selectedItems.length - 5} more</li>
                    )}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="github" className="text-right">
                GitHub Repo
              </Label>
              <Input
                id="github"
                value={githublink}
                onChange={(e) => setGithublink(e.target.value)}
                className="col-span-3"
                placeholder="username/repo"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link1" className="text-right">
                External Link 1
              </Label>
              <Input
                id="link1"
                value={link1}
                onChange={(e) => setLink1(e.target.value)}
                className="col-span-3"
                placeholder="https://example.com"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Additional Links</Label>
              <div className="col-span-3 space-y-2">
                {links.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={link}
                      onChange={(e) => updateLink(index, e.target.value)}
                      placeholder="https://example.com"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeLink(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addLink}>
                  <Plus className="h-4 w-4 mr-2" /> Add Link
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="actions" className="text-right">
                Prompt / Actions
              </Label>
              <Textarea
                id="actions"
                value={actions}
                onChange={(e) => setActions(e.target.value)}
                className="col-span-3"
                placeholder="Describe custom actions or capabilities"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              Create Time Capsule
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
