import axios, { AxiosRequestConfig } from "axios";
import { apiKeyManager } from "./api-key-manager";

export async function fetchWithRetry(
  url: string,
  serviceName: string,
  config: AxiosRequestConfig = {}
) {
  const defaultHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, X-API-Key",
    "Access-Control-Allow-Credentials": "true",
  };

  try {
    const apiKey = await apiKeyManager.getApiKey(serviceName);

    // If it's a preflight OPTIONS request, return immediately with CORS headers
    if (config.method === "OPTIONS") {
      return {
        headers: defaultHeaders,
        status: 204,
        statusText: "No Content",
      };
    }

    const response = await axios({
      withCredentials: true,
      url,
      method: config.method || "GET",
      ...config,
      headers: {
        ...defaultHeaders,
        ...config.headers,
        "X-API-Key": apiKey,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 401 ||
        error.response?.status === 403 ||
        (error.response?.status === 500 &&
          error.response?.data?.detail?.includes("Invalid API key")))
    ) {
      apiKeyManager.invalidateCache();

      const newApiKey = await apiKeyManager.getApiKey(serviceName);
      const retryResponse = await axios({
        url,
        method: config.method || "GET",
        ...config,
        headers: {
          ...defaultHeaders,
          ...config.headers,
          "X-API-Key": newApiKey,
        },
      });
      return retryResponse.data;
    }
    throw error;
  }
}
