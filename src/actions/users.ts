import { createHash } from "crypto";
import {
  updateUserInDynamoDB,
  storeUserInDynamoDB,
  getUserByEmail,
} from "../lib/dynamodb";

function generateUserId(email: string): string {
  return createHash("sha256").update(email).digest("hex").substring(0, 25);
}

type UserData = {
  email: string;
  name: string;
  image: string;
  username: string;
  provider: string;
};

export async function storeOrUpdateUserInDynamoDB(userData: UserData): Promise<{
  userId: string;
  username: string;
}> {
  try {
    const existingUser = await getUserByEmail(userData.email);

    if (existingUser) {
      await updateUserInDynamoDB({
        userId: existingUser.userId,
        LastUpdated: new Date().toISOString(),
        ...userData,
      });

      return {
        userId: existingUser.userId,
        username: userData.username,
      };
    } else {
      const userId = generateUserId(userData.email);

      await storeUserInDynamoDB({
        userId,
        ...userData,
      });

      return {
        userId,
        username: userData.username,
      };
    }
  } catch (error) {
    console.error("Error in storeOrUpdateUserInDynamoDB:", error);
    throw error;
  }
}
