import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mlTimeCapsules } from "@/constants/time-capsule-data";
import Image from "next/image";
import { Clock, Play } from "lucide-react";
export function ExploreTimeCapsules() {
  const categories = Array.from(
    new Set(mlTimeCapsules.map((capsule) => capsule.category))
  );
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">
        Explore Time Capsule Categories
      </h2>
      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {mlTimeCapsules
                .filter((capsule) => capsule.category === category)
                .map((capsule) => (
                  <Card
                    key={capsule.id}
                    className="h-full transition-shadow hover:shadow-lg"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{capsule.title}</span>
                        <Image
                          src="/time-capsule.png"
                          height={40}
                          width={40}
                          alt="time-capsule 2"
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {capsule.description}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock size={16} className="mr-2" />
                        <span>Trained on: {capsule.trainingDate}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-secondary/50 p-4 hover:bg-secondary/100 transition-colors duration-200 cursor-pointer flex items-center justify-between">
                      <span className="mr-2">Run</span>
                      <Play className="h-4 w-4" />
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
