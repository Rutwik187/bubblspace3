"use client";

import { CreateTimeCapsuleDialog } from "@/components/time-capsule/create-time-capsule-form";
import { FeaturedTimeCapsules } from "@/components/featured-timcecapsules";
import { ExploreTimeCapsules } from "@/components/explore-time-capsules";
import { DraftTimeCapsules } from "@/components/draft-time-capsules";
import { UserTimeCapsules } from "@/components/user-timecapsules";
import HomeSearch from "@/components/home-search";
import { useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="min-h-screen">
      <main className="container mx-auto py-12 space-y-12 px-4">
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Create Your Time Capsule
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Create, run, and interact with specialized time capsules.
          </p>
          <div className="flex justify-center items-center gap-4">
            <HomeSearch />
            <CreateTimeCapsuleDialog />
          </div>
        </section>
        <UserTimeCapsules />
        <FeaturedTimeCapsules />
        <ExploreTimeCapsules />
        <DraftTimeCapsules />
      </main>
    </div>
  );
}
