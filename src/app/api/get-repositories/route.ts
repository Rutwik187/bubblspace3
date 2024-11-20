import { NextResponse } from "next/server";
import {
  getInstallationId,
  getInstallationOctokit,
} from "@/app/actions/github";

export async function GET() {
  try {
    const installationId = await getInstallationId();

    if (!installationId) {
      return NextResponse.json(
        { error: "GitHub App not installed for this user" },
        { status: 400 }
      );
    }

    const octokit = await getInstallationOctokit(installationId);
    const { data: repos } = await octokit.request(
      "GET /installation/repositories"
    );

    const userRepos = repos.repositories;

    return NextResponse.json({ userRepos });
  } catch (error) {
    console.error("Error listing repos:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
