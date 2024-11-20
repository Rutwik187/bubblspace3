"use client";

import * as React from "react";
import { Search, Loader2, Power, Play } from "lucide-react";
import { useUserTimeCapsules } from "@/hooks/get-user-timecapsules";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTimeCapsules } from "@/hooks/featured-timecapsules";
import { useHandleTimeCapsule } from "@/hooks/use-handle-timecapsule";
import { useSession } from "next-auth/react";

interface Microlearning {
  userid: string;
  "userID#sessionID": string;
  title: string;
  description: string;
  subtype: string;
}

export default function ShadcnSearch() {
  const [open, setOpen] = React.useState(false);
  const { data: userTimeCapsules } = useUserTimeCapsules();
  const { data: timeCapsules } = useTimeCapsules();
  const { data: session } = useSession();
  const { handleStart, isPending } = useHandleTimeCapsule();

  const loggedInUserId = session?.userId as string;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const isOwnOrAccessedContent = (item: Microlearning) => {
    const isOwnContent = item.userid === loggedInUserId;
    const hasAccessed = userTimeCapsules?.microlearning.items.find(
      (userItem) => userItem.timecapsuleid === item["userID#sessionID"]
    );
    return isOwnContent || hasAccessed;
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search time capsules...</span>
        <span className="inline-flex lg:hidden">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search time capsules..." />
        <CommandList>
          <CommandEmpty>No time capsules found.</CommandEmpty>
          <CommandGroup heading="Time Capsules">
            {timeCapsules?.microlearning.items.map((item) => {
              const isOwnOrAccessed = isOwnOrAccessedContent(item);

              return (
                <CommandItem
                  key={item["userID#sessionID"]}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <Button
                    size="sm"
                    className="ml-2 transition-all duration-300"
                    onClick={() =>
                      handleStart({
                        userid: item.userid,
                        userIdSessionId: item["userID#sessionID"],
                      })
                    }
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="ml-2">Starting...</span>
                      </>
                    ) : (
                      <>
                        {isOwnOrAccessed ? (
                          <>
                            <Play className="h-4 w-4 mr-2" /> Continue
                          </>
                        ) : (
                          <>
                            <Power className="h-4 w-4 mr-2" /> Start Learning
                          </>
                        )}
                      </>
                    )}
                  </Button>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
