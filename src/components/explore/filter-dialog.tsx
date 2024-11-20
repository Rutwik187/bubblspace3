"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Star, Filter } from "lucide-react";

const categories = [
  { id: "programming", label: "Programming" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
  { id: "business", label: "Business" },
  { id: "personal-development", label: "Personal Development" },
];

const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

interface FilterDialogProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDifficulty: string;
  setSelectedDifficulty: React.Dispatch<React.SetStateAction<string>>;
  duration: number[];
  setDuration: React.Dispatch<React.SetStateAction<number[]>>;
  minRating: number;
  setMinRating: React.Dispatch<React.SetStateAction<number>>;
  resetFilters: () => void;
}

export function FilterDialog({
  selectedCategories,
  setSelectedCategories,
  selectedDifficulty,
  setSelectedDifficulty,
  duration,
  setDuration,
  minRating,
  setMinRating,
  resetFilters,
}: FilterDialogProps) {
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Time Capsules</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Categories</h3>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <label htmlFor={category.id} className="text-sm cursor-pointer">
                  {category.label}
                </label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Difficulty</h3>
            {difficultyLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={selectedDifficulty === level}
                  onCheckedChange={() =>
                    setSelectedDifficulty(
                      selectedDifficulty === level ? "" : level
                    )
                  }
                />
                <label htmlFor={level} className="text-sm cursor-pointer">
                  {level}
                </label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Duration (minutes)</h3>
            <Slider
              value={duration}
              onValueChange={setDuration}
              min={0}
              max={60}
              step={5}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{duration[0]} min</span>
              <span>{duration[1]} min</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Minimum Rating</h3>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={minRating >= rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMinRating(rating)}
                  className="p-1"
                >
                  <Star
                    className={`h-4 w-4 ${
                      minRating >= rating ? "fill-current" : ""
                    }`}
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Button onClick={resetFilters} variant="outline" className="w-full">
          Reset Filters
        </Button>
      </DialogContent>
    </Dialog>
  );
}
