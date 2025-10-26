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
    try {
        const accessToken = AuthHelper.getToken();

        const options: RequestInit = {
            method,
            headers: {},
            signal,
        };

        if (body && !(body instanceof FormData)) {
            options.headers = { 'Content-Type': 'application/json' };
            options.body = JSON.stringify(body);
        } else if (body) {
            options.body = body;
        }

        if (accessToken) {
            (options.headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
        }
        console.log(`fecthing: ${url}`)
        const response = await fetch(url, options);
        if (response.status === 401 && authRequired) {
            if (alterUnauthorized) alterUnauthorized();
            else AuthHelper.handleUnauthorized();
            return Promise.reject(new Error("Unauthorized"));
        }

        if (!response.ok) {
            return Promise.reject(new Error(await response.text()));
        }

        return rawResponse ? response : await response.json();
    } catch (err) {
        return Promise.reject(err);
    }
}
