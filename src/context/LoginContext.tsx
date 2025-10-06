import {createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {AuthApi} from "../api/AuthApi";

interface LoginContextType {
    isLoggedIn: boolean;
    setLoginSuccess: () => void;
    setLogout: () => void;
    getAccessToken: () => string | null;
}

interface LoginProviderProps {
    readonly children: ReactNode;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({children}: LoginProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY || "accessToken";
    const authApi = useMemo(() => new AuthApi(), []);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response: any = await authApi.checkLogin();
                if (response.status === 200) {
                    setIsLoggedIn(true);
                }
            } catch (err) {
                console.error("Failed to check login status:", (err as Error).message);
            }
        };
        checkLogin();
    }, [authApi]);

    const setLoginSuccess = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const setLogout = useCallback(async () => {
        setIsLoggedIn(false);
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = "/";
    }, [authApi, TOKEN_KEY]);

    const getAccessToken = useCallback(() => {
        return localStorage.getItem(TOKEN_KEY);
    }, [TOKEN_KEY]);

    const value = useMemo(
        () => ({
            isLoggedIn,
            setLoginSuccess,
            setLogout,
            getAccessToken
        }),
        [isLoggedIn, setLoginSuccess, setLogout, getAccessToken]
    );

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin(): LoginContextType {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return context;
}
