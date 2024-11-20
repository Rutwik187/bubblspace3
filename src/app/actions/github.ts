"use server";

import { auth } from "@/auth";
import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/core";
import { App } from "@octokit/app";

const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.GITHUB_APP_ID! || "test",
    privateKey: process.env.GITHUB_PRIVATE_KEY! || "test",
    clientId: process.env.GITHUB_CLIENT_ID! || "test",
    clientSecret: process.env.GITHUB_CLIENT_SECRET! || "test",
  },
});

const app = new App({
  appId: process.env.GITHUB_APP_ID! || "test",
  privateKey: process.env.GITHUB_PRIVATE_KEY! || "test",
  oauth: {
    clientId: process.env.GITHUB_CLIENT_ID! || "test",
    clientSecret: process.env.GITHUB_CLIENT_SECRET! || "test",
  },
});

export async function getInstallationId(): Promise<number | null> {
  try {
    const session = await auth();
    if (!session?.userId) {
      throw new Error("User not authenticated");
    }

    const { data: installations } = await appOctokit.request(
      "GET /app/installations"
    );

    const installation = installations.find(
      (item) => item.account?.id === session.user?.id
    );

    if (!installation) {
      return null; // GitHub App not installed for this user
    }

    return installation.id;
  } catch (error) {
    console.error("Error getting installation ID:", error);
    throw new Error("Failed to get GitHub App installation ID");
  }
}

export async function getInstallationOctokit(installationId: number) {
  try {
    return await app.getInstallationOctokit(installationId);
  } catch (error) {
    console.error("Error getting installation Octokit:", error);
    throw new Error("Failed to authenticate with GitHub");
  }
}
