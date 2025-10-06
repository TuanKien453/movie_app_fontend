import { apiCall } from '../utils/ApiUtil';

const API_DOMAIN = import.meta.env.VITE_BASE_API_ENDPOINT;

export class AuthApi {
    async checkLogin(): Promise<boolean> {
        try {
            await apiCall(`${API_DOMAIN}/auth/isLogined`, "GET", null, true);
            return true;
        } catch (err: any) {
            console.error(err.message);
            return false;
        }
    }

    async login(userName: string, password: string): Promise<string> {
        try {
            const data = await apiCall(
                `${API_DOMAIN}/auth/login`,
                "POST",
                { UserName: userName, Password: password },
                false
            );
            return data.accessToken;
        } catch (err: any) {
            console.error("Login failed:", err.message);
            throw err;
        }
    }
}