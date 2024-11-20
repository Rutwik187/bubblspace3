"use server";

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secretsManager = new SecretsManagerClient({
  region: "ap-south-1",
});

export async function getApiKeyFromServer() {
  try {
    const command = new GetSecretValueCommand({
      SecretId: "Beluga3/Services/APIKey",
    });

    const response = await secretsManager.send(command);
    if (!response.SecretString) {
      throw new Error("No secret value found");
    }

    return response.SecretString;
  } catch (error) {
    console.error("Failed to fetch API key:", error);
    throw new Error("Failed to fetch API key");
  }
}
