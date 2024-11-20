import { NextResponse } from "next/server";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

// Configure AWS client
const secretsManager = new SecretsManagerClient({
  region: "ap-south-1",
  // The SDK will automatically use the IAM role if credentials are not specified
});

export async function GET() {
  try {
    const command = new GetSecretValueCommand({
      SecretId: "Beluga3/Services/APIKey",
    });

    const response = await secretsManager.send(command);
    if (!response.SecretString) {
      throw new Error("No secret value found");
    }

    // Add CORS headers
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    };

    return NextResponse.json(response.SecretString, { headers });
  } catch (error) {
    console.error("Failed to fetch API key:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch API key",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
