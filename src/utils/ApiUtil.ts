import { useLogin } from "../context/LoginContext.tsx";

export async function apiCall(
    url: string,
    method: string,
    body?: any,
    authRequired: boolean = false,
    rawResponse: boolean = false,
    signal?: AbortSignal
): Promise<any> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { getAccessToken, setLogout } = useLogin();

    const token = authRequired ? getAccessToken() : null;

    const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
        signal,
    };

    if (authRequired && token) {
        (options.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (response.status === 401 && authRequired) {
        setLogout();
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return rawResponse ? response : await response.json();
}
