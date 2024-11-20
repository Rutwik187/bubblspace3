import {
  getInstallationId,
  getInstallationOctokit,
} from "@/app/actions/github";
import { RepoListClient } from "./repo-list-client";
import { Repository } from "../types/repositories";

async function getRepositories(): Promise<Repository[]> {
  try {
    const installationId = await getInstallationId();
    if (!installationId) {
      throw new Error("GitHub App not installed");
    }

    const octokit = await getInstallationOctokit(installationId);
    const { data } = await octokit.request("GET /installation/repositories");
    return data.repositories;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}

export async function RepoListServer() {
  try {
    const repos = await getRepositories();
    return <RepoListClient repos={repos} />;
  } catch (error) {
    return <div>Error loading repositories. Please try again later.</div>;
  }
}
