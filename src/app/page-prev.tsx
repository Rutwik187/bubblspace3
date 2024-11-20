import { auth } from "@/auth";
import { GitHubAppInstall } from "@/components/github-install";
import Hero from "@/components/landing-page/hero";
import { RepoListServer } from "@/components/repo-list-server";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-white dark:bg-background">
      <Hero />
      <GitHubAppInstall />

      {session?.user ? <RepoListServer /> : null}
    </div>
  );
}
