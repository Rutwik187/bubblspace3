"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import AnimatedShinyText from "./shinny-text";
import { motion } from "framer-motion";
import { Spotlight } from "../ui/spot-light";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Spotlight Positioned Behind */}
      <Spotlight
        className="absolute top-0 left-0 w-full h-full z-0"
        fill="white"
      />

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto mb-8 inline-flex items-center justify-center space-x-2 overflow-hidden rounded-full bg-secondary/80 dark:bg-secondary/20 px-7 py-2 shadow-md backdrop-blur transition-all hover:bg-secondary dark:hover:bg-secondary/30"
          >
            <Link href="/story-board">
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 text-sm font-medium text-foreground dark:text-secondary-foreground transition ease-out hover:text-primary dark:hover:text-primary">
                <span>✨ Create your Agent</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedShinyText>
            </Link>
          </motion.div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Start building{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-purple-400">
              Agents
            </span>{" "}
            in seconds.
          </h1>

          <p className="mx-auto mt-5 max-w-prose text-xl text-muted-foreground dark:text-gray-300">
            Work with bubblspace to create your custom agents to write blogs,
            create travel guides, and much more...
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <Link
              className={buttonVariants({
                size: "lg",
                className:
                  "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary-400 dark:text-primary-900 dark:hover:bg-primary-300",
              })}
              href="/story-board"
            >
              Get started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 sm:mt-24"
        >
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-border dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background dark:bg-gray-900 px-4 text-sm text-muted-foreground dark:text-gray-400">
                Powered by advanced AI
              </span>
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="-m-2 rounded-xl bg-secondary/50 dark:bg-secondary/10 p-2 ring-1 ring-inset ring-secondary dark:ring-secondary/20 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/demo-img.png"
                alt="AI Agent Interface"
                width={1364}
                height={866}
                quality={100}
                className="rounded-md bg-background dark:bg-gray-800 p-2 shadow-2xl ring-1 ring-secondary dark:ring-secondary/20 sm:p-8 md:p-20"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 dark:opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
}
