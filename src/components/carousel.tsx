"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FeaturedTimeCapsuleCard } from "./featured-timecapsule-card";
import { UserTimeCapsuleCard } from "./user-timecapsule-card";
import { Microlearning } from "../types/timecapsules";

interface CarouselProps {
  microlearnings: Microlearning[];
  type: "featured" | "user-time";
}

export function Carousel({ microlearnings, type }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % microlearnings.length);
  }, [microlearnings.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + microlearnings.length) % microlearnings.length
    );
  }, [microlearnings.length]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(nextSlide, 5000);
    }

    return () => clearInterval(intervalId);
  }, [isAutoPlaying, nextSlide]);

  const visibleSlides = 3;
  const totalSlides = microlearnings.length;

  return (
    <div
      className="relative max-w-6xl mx-auto px-4 py-8"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground">
          {type === "featured"
            ? "Featured Microlearnings"
            : "Your Time Capsules"}
        </h2>
        <Button variant="outline">View All</Button>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
          }}
        >
          {microlearnings.map((microlearning, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
              style={{
                opacity:
                  index >= currentIndex && index < currentIndex + visibleSlides
                    ? 1
                    : 0.5,
              }}
            >
              {type === "featured" ? (
                <FeaturedTimeCapsuleCard microlearning={microlearning} />
              ) : (
                <UserTimeCapsuleCard microlearning={microlearning} />
              )}
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={prevSlide}
        className="absolute -left-6 top-1/2 transform -translate-y-1/2"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        onClick={nextSlide}
        className="absolute -right-6 top-1/2 transform -translate-y-1/2"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <div className="flex justify-center mt-4">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentIndex ? "bg-primary" : "bg-primary/20"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
