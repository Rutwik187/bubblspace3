import { getApiKeyFromServer } from '@/app/actions/get-api-key';

interface CachedKey {
  value: string;
  expiresAt: number;
}

interface ApiKeyData {
  [service: string]: {
    secret_key: string;
  };
}

class ApiKeyManager {
  private static instance: ApiKeyManager;
  private cache: CachedKey | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes (will be changed to 2 days)
  
  private constructor() {}

  public static getInstance(): ApiKeyManager {
    if (!this.instance) {
      this.instance = new ApiKeyManager();
    }
    return this.instance;
  }

  private async fetchFromSecretsManager(): Promise<string> {
    try {
      return await getApiKeyFromServer();
    } catch (error) {
      console.error('Failed to fetch API key from secrets manager:', error);
      throw error;
    }
  }

  private isCacheValid(): boolean {
    return !!(
      this.cache &&
      this.cache.value &&
      Date.now() < this.cache.expiresAt
    );
  }

  public async getApiKey(service?: string): Promise<string> {
    if (this.isCacheValid()) {
      const cachedData = JSON.parse(this.cache!.value) as ApiKeyData;
      if (service && cachedData[service]) {
        return cachedData[service].secret_key;
      }
      return Object.values(cachedData)[0].secret_key;
    }

    const rawData = await this.fetchFromSecretsManager();
    const apiKeyData = JSON.parse(rawData) as ApiKeyData;
    this.cache = {
      value: rawData,
      expiresAt: Date.now() + this.CACHE_DURATION,
    };
    
    if (service && apiKeyData[service]) {
      return apiKeyData[service].secret_key;
    }
    return Object.values(apiKeyData)[0].secret_key;
  }

  public invalidateCache(): void {
    console.log('Invalidating API key cache due to API error');
    this.cache = null;
  }
}

export const apiKeyManager = ApiKeyManager.getInstance(); 