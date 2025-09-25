export interface FetchRetryOptions extends RequestInit {
    timeoutMs?: number;
    retries?: number;
    retryDelayMs?: number;
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithTimeout(url: string, options: FetchRetryOptions = {}): Promise<Response> {
    const { timeoutMs = 10000, ...rest } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, { ...rest, signal: controller.signal });
        return response;
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function fetchWithRetry(url: string, options: FetchRetryOptions = {}): Promise<Response> {
    const { retries = 2, retryDelayMs = 400, ...rest } = options;

    let lastError: unknown = null;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            const response = await fetchWithTimeout(url, rest);
            if (!response.ok) {
                if (response.status >= 500 && attempt < retries) {
                    await delay(retryDelayMs * (attempt + 1));
                    continue;
                }
            }
            return response;
        } catch (error) {
            lastError = error;
            if (attempt < retries) {
                await delay(retryDelayMs * (attempt + 1));
                continue;
            }
        }
    }

    throw lastError instanceof Error ? lastError : new Error("Network error");
}