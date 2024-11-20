"use client";

import React, { useState, useEffect } from "react";
import { useTimeCapsules } from "@/hooks/featured-timecapsules";
import { FeaturedTimeCapsuleCard } from "@/components/featured-timecapsule-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, SortAsc, SortDesc } from "lucide-react";
import { FilterDialog } from "@/components/explore/filter-dialog";
import { Microlearning } from "@/types/timecapsules";
export default function ExploreTimeCapsules() {
  const { data: timeCapsules, isLoading, error } = useTimeCapsules();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredTimeCapsules, setFilteredTimeCapsules] = useState<
    Microlearning[]
  >([]);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [duration, setDuration] = useState<number[]>([0, 60]);
  const [minRating, setMinRating] = useState<number>(0);

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedDifficulty("");
    setDuration([0, 60]);
    setMinRating(0);
  };

  useEffect(() => {
    if (timeCapsules) {
      let filtered = timeCapsules.microlearning.items.filter((capsule) =>
        capsule.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Apply category filter
      if (selectedCategories.length > 0) {
        filtered = filtered.filter((capsule) =>
          selectedCategories.includes(capsule.category)
        );
      }

      // Apply difficulty filter
      if (selectedDifficulty) {
        filtered = filtered.filter(
          (capsule) => capsule.difficulty === selectedDifficulty
        );
      }

      // Apply duration filter
      filtered = filtered.filter((capsule) => {
        const capsuleDuration = capsule.duration || 0;
        return capsuleDuration >= duration[0] && capsuleDuration <= duration[1];
      });

      // Apply rating filter
      filtered = filtered.filter(
        (capsule) => (capsule.rating || 0) >= minRating
      );

      filtered.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });

      setFilteredTimeCapsules(filtered);
    }
  }, [
    timeCapsules,
    searchTerm,
    sortOrder,
    selectedCategories,
    selectedDifficulty,
    duration,
    minRating,
  ]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Explore Time Capsules
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search time capsules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <FilterDialog
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          duration={duration}
          setDuration={setDuration}
          minRating={minRating}
          setMinRating={setMinRating}
          resetFilters={resetFilters}
        />

        <Button
          variant="outline"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="w-full sm:w-auto"
        >
          {sortOrder === "asc" ? (
            <SortAsc className="mr-2 h-4 w-4" />
          ) : (
            <SortDesc className="mr-2 h-4 w-4" />
          )}
          Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </Button>
      </div>

      {filteredTimeCapsules.length === 0 ? (
        <div className="text-center text-gray-500 mt-16">
          No time capsules found. Try adjusting your search or filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTimeCapsules.map((capsule) => (
            <FeaturedTimeCapsuleCard
              key={capsule["userID#sessionID"]}
              microlearning={capsule}
            />
          ))}
        </div>
      )}
    </div>
  );
}
