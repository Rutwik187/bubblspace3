"use client";

import { FeaturedTimeCapsuleCard } from "@/components/featured-timecapsule-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTimeCapsules } from "@/hooks/featured-timecapsules";
import { Filter, Loader2, Search } from "lucide-react";
import { useState } from "react";

export default function ExploreTimeCapsules() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const { data: timeCapsules, isLoading, error } = useTimeCapsules();

  // Ensure we have a valid array of time capsules before filtering
  const filteredTimeCapsules = timeCapsules?.microlearning?.items
    ? timeCapsules.microlearning.items.filter((capsule) => {
        const matchesSearch =
          searchTerm === "" ||
          capsule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          capsule.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
          filter === "all" ||
          (filter === "featured" && capsule.status === "featured") ||
          (filter !== "featured" && capsule.subtype === filter);
        return matchesSearch && matchesFilter;
      })
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
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

  // Early return if no time capsules data is available
  if (!timeCapsules?.microlearning?.items) {
    return (
      <div className="text-center text-gray-500 mt-16">
        <p className="text-2xl font-semibold mb-2">
          No time capsules available
        </p>
        <p>Please try again later</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Explore Time Capsules
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search time capsules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="creator">Creator</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTimeCapsules.length === 0 ? (
        <div className="text-center text-gray-500 mt-16">
          <p className="text-2xl font-semibold mb-2">No time capsules found</p>
          <p>Try adjusting your search or filter settings</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTimeCapsules.map((capsule, index) => (
            <FeaturedTimeCapsuleCard microlearning={capsule} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
