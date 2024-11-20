"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X } from "lucide-react";
import { floatingCardStore } from "@/store/progress-floating-card";
import { Button } from "@/components/ui/button";

export const PersistentFloatingCard: React.FC = () => {
  const { isCreating, progress, title, setIsCreating, setProgress } =
    floatingCardStore();

  const handleClose = () => {
    setIsCreating(false);
    setProgress(0);
  };

  return (
    <AnimatePresence>
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="fixed top-4 right-4 z-50 w-80 bg-background rounded-lg shadow-lg overflow-hidden border border-border"
        >
          <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
            <h3 className="text-lg font-semibold">Creating Time Capsule</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-primary-foreground hover:bg-primary/90"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-primary animate-pulse" />
              <p className="text-sm">
                {title || "Your time capsule"} is being created...
              </p>
            </div>
            <div className="w-full bg-secondary rounded-full h-2.5">
              <motion.div
                className="bg-primary h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This may take a few minutes. You can continue using the
              application.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
