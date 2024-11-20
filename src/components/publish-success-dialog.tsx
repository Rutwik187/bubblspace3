import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Tag, BookOpen } from "lucide-react";
import { Microlearning } from "../types/timecapsules";

interface PublishSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  microlearning: Microlearning;
  onContinue: (params: { userid: string; userIdSessionId: string }) => void;
}

export function PublishSuccessDialog({
  isOpen,
  onClose,
  microlearning,
  onContinue,
}: PublishSuccessDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-gradient-to-b from-background to-muted/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {/* Background Success Pattern */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-0 inset-x-0 h-32 dark:opacity-20"
                style={{
                  background:
                    "radial-gradient(circle at center, var(--success-gradient) 0%, transparent 70%)",
                }}
              />

              {/* Content Container */}
              <div className="relative z-10">
                {/* Success Animation */}
                <div className="flex items-center justify-center h-32">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{
                      duration: 0.5,
                      times: [0, 0.7, 1],
                      ease: "easeOut",
                    }}
                  >
                    <div className="bg-green-50 dark:bg-green-950/30 rounded-full p-8 ">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="px-6"
                >
                  <DialogHeader>
                    <motion.div
                      className="text-center space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h2 className="text-2xl font-bold">
                        Time Capsule Published!
                      </h2>
                      <p className="text-muted-foreground">
                        Your time capsule is now live and ready to be shared
                      </p>
                    </motion.div>
                  </DialogHeader>

                  <motion.div
                    className="mt-6 space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {/* Capsule Details Card */}
                    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                      <h3 className="font-semibold text-lg mb-4">
                        {microlearning.title}
                      </h3>

                      <div className="space-y-4">
                        <div className="flex gap-3 text-muted-foreground">
                          <BookOpen className="h-5 w-5 flex-shrink-0" />
                          <p className="text-sm">{microlearning.description}</p>
                        </div>

                        <div className="flex gap-3 text-muted-foreground">
                          <Tag className="h-5 w-5 flex-shrink-0" />
                          <p className="text-sm">{microlearning.subtype}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pb-6">
                      <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-4 py-2"
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() =>
                          onContinue({
                            userid: microlearning.userid,
                            userIdSessionId: microlearning["userID#sessionID"],
                          })
                        }
                      >
                        View Capsule
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
