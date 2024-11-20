import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-south-1",
});

export const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "Users";

export async function getUserFromDynamoDB(userId: string) {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      userId: userId,
    },
  };

  try {
    const { Item } = await docClient.send(new GetCommand(params));
    return Item;
  } catch (error) {
    console.error("Error getting user from DynamoDB:", error);
    throw error;
  }
}

export async function updateUserInDynamoDB(user: {
  userId: string;
  email: string;
  name: string;
  image: string;
  username: string;
  provider: string;
  LastUpdated: string;
}) {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      userId: user.userId,
    },
    UpdateExpression:
      "set email = :e, #name = :n, image = :i, username = :u, provider = :p, LastUpdated = :ua",
    ExpressionAttributeValues: {
      ":e": user.email,
      ":n": user.name,
      ":i": user.image,
      ":u": user.username,
      ":p": user.provider,
      ":ua": new Date().toISOString(),
    },
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ReturnValues: "ALL_NEW" as const,
  };

  try {
    const { Attributes } = await docClient.send(new UpdateCommand(params));
    return Attributes;
  } catch (error) {
    console.error("Error updating user in DynamoDB:", error);
    throw error;
  }
}

export async function storeUserInDynamoDB(user: {
  userId: string;
  email: string;
  name: string;
  image: string;
  username: string;
  provider: string;
}) {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      ...user,
      createdAt: new Date().toISOString(),
      LastUpdated: new Date().toISOString(),
      status: "active",
      userType: "RegularFree",
    },
  };

  try {
    await docClient.send(new PutCommand(params));
    return user;
  } catch (error) {
    console.error("Error storing user in DynamoDB:", error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  try {
    const { Items } = await docClient.send(new QueryCommand(params));
    return Items && Items.length > 0 ? Items[0] : null;
  } catch (error) {
    console.error("Error querying user by email from DynamoDB:", error);
    throw error;
  }
}
