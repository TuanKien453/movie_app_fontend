const TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY || "accessToken";

export const AuthHelper = {
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    },

    clearToken(): void {
        localStorage.removeItem(TOKEN_KEY);
    },

    handleUnauthorized(): void {
        this.clearToken();
        window.location.href = "/";
    }
};