"use client";
import { submitApplication } from "@/app/actions/careers-application";
import { Button } from "@/components/ui/button";
import Description from "@/components/ui/description";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { useState, useTransition } from "react";
export default function Component() {
  const [isPending, startTransition] = useTransition();

  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitApplication(formData);

      if (result.success) {
        toast({
          title: "Application Submitted",
          description: result.message,
        });
      } else {
        toast({
          title: "Submission Failed",
          description: result.message,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    });
  }
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Heading>AI Engineer (0-2 Years Experience)</Heading>
                <Description>
                  Join AIEDX in revolutionizing AI-powered product development
                  with our innovative platform, BubblSpace.
                </Description>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Job Description</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  We are looking for an AI Engineer to join our team and
                  contribute to the development of BubblSpace, our cutting-edge
                  AI-first innovation platform.
                </p>
                <h3 className="text-xl font-bold">Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-500 dark:text-gray-400">
                  <li>Backend development for BubblSpace</li>
                  <li>
                    AI development research and tool building, including AI
                    Agents and fine-tuning of LLMs
                  </li>
                  <li>Building synthetic datasets</li>
                  <li>
                    Deploying LLMs and AI Agents for both single and distributed
                    inference
                  </li>
                  <li>Content creation and community engagement</li>
                  <li>Testing and QA</li>
                </ul>
                <h3 className="text-xl font-bold">Qualifications</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-500 dark:text-gray-400">
                  <li>
                    BTech or BE in Information Technology, Electronics &
                    Technology, Computer Science, Electronics, or a similar
                    field
                  </li>
                  <li>Experience with Python backend frameworks</li>
                  <li>
                    Experience with AI frameworks such as PyTorch, vLLM,
                    Transformers, etc.
                  </li>
                  <li>Strong communication skills</li>
                  <li>
                    Self-motivated and willing to work in a hybrid, innovative
                    environment
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Application Form</h2>
                <form className="space-y-4" action={onSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name*</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email*</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      required
                      type="tel"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Repository Link*</Label>
                    <Input
                      id="github"
                      name="github"
                      placeholder="Enter your GitHub repository link"
                      required
                      type="url"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience*</Label>
                    <Input
                      id="experience"
                      name="experience"
                      placeholder="Enter your years of experience"
                      required
                      type="number"
                      min="0"
                      max="5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume*</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="resume"
                        name="resume"
                        required
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) =>
                          setFileName(e.target.files?.[0]?.name || "")
                        }
                      />
                      <Button asChild>
                        <Label htmlFor="resume" className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Resume
                        </Label>
                      </Button>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {fileName}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cover-letter">Cover Letter</Label>
                    <Textarea
                      id="cover-letter"
                      name="cover-letter"
                      placeholder="Enter your cover letter"
                    />
                  </div>
                  <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
