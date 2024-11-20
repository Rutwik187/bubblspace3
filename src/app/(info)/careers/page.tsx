import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Description from "@/components/ui/description";
import Heading from "@/components/ui/heading";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen ">
      <section className="w-full py-12 md:py-24 lg:py-32 ">
        <div className="px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <Heading>Join Our Team at AIEDX</Heading>
              <Description>
                Explore exciting opportunities to innovate and build
                extraordinary AI-powered solutions with us.
              </Description>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <Card>
              <CardHeader>
                <CardTitle>AI Engineer (0-2 Years Experience)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <Clock className="w-4 h-4" />
                  <span>Hybrid</span>
                </div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Join our team to contribute to the development of BubblSpace,
                  our cutting-edge AI-first innovation platform.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/careers/ai-engineer">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
