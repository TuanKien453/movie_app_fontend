import { AuthHelper } from "./AuthHelper";

export async function apiCall(
    url: string,
    method: string,
    body?: any,
    authRequired: boolean = false,
    alterUnauthorized?: () => void,
    rawResponse: boolean = false,
    signal?: AbortSignal
): Promise<any> {
    const accessToken = AuthHelper.getToken();

    const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
        signal,
    };

    if (accessToken) {
        (options.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (response.status === 401 && authRequired) {
        if (alterUnauthorized) alterUnauthorized();
        else AuthHelper.handleUnauthorized();
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return rawResponse ? response : await response.json();
}
