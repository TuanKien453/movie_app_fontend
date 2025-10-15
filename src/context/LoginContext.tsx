import {createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {AuthApi} from "../api/AuthApi";
import {AuthHelper} from "../utils/AuthHelper";

interface LoginContextType {
    isLoggedIn: boolean|null;
    setLoginSuccess: () => void;
    setLogout: () => void;
}

interface LoginProviderProps {
    readonly children: ReactNode;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({children}: LoginProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean|null>(null);
    const authApi = useMemo(() => new AuthApi(), []);

    const checkLogin = useCallback(() => {
        authApi.checkLogin().then(response => {
            if (response) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                AuthHelper.clearToken();
            }
            console.log("login status response: "+response);
        }).catch(err => {
            console.error("Failed to check login status:", (err as Error).message);
            setIsLoggedIn(false);
        })
    },[]);


    useEffect(() => {
        checkLogin();
    }, []);

    const setLoginSuccess = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const setLogout = useCallback(() => {
        setIsLoggedIn(false);
        AuthHelper.handleUnauthorized();
    }, []);

    const value = useMemo(
        () => ({
            isLoggedIn,
            setLoginSuccess,
            setLogout,
        }),
        [isLoggedIn, setLoginSuccess, setLogout]
    );

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export function useLogin(): LoginContextType {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return context;
}
