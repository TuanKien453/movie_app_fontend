import { apiCall } from "../utils/ApiUtil";
const API_DOMAIN = import.meta.env.VITE_BASE_API_ENDPOINT;
const TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY || "accessToken";

export class AuthApi {

    async checkLogin(): Promise<boolean> {
        try {
            await apiCall(`${API_DOMAIN}/IsLogined`, "GET", null, true, () => {},true);
            return true;
        } catch (err) {
            return false;
        }
    }

    async login(userName: string, password: string): Promise<string | null> {
        try {
            const data = await apiCall(
                `${API_DOMAIN}/login`,
                "POST",
                { UserName: userName, Password: password }
            );
            localStorage.setItem(TOKEN_KEY, data.accessToken);
            return data.accessToken;
        } catch (err) {
            console.error("login error:", err);
            return null;
        }
    }

}
