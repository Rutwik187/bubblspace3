import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/providers";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { cn } from "@/lib/utils";
import { PersistentFloatingCard } from "@/components/floating-card";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BubblSpace",
  description: "Create your AI agents with breeze",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.className, "antialiased")}>
        <Providers>
          <AdminPanelLayout>
            <main className="flex flex-col min-h-screen max-w-7xl mx-auto">
              {children}
            </main>
          </AdminPanelLayout>
          <PersistentFloatingCard />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
