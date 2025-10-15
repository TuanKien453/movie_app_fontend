import {useMemo, useState} from "react";
import {AuthApi} from "../api/AuthApi.ts";
import {AuthHelper} from "../utils/AuthHelper.ts";
import {useLogin} from "../context/LoginContext.tsx";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const authApi = useMemo(() => new AuthApi(), []);

    const {setLoginSuccess} = useLogin();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (!username || !password) {
            setMessage("Please enter both username and password.");
            return;
        }

        authApi.login(username, password).then((result) => {
            if (result) {
                setLoginSuccess();
                AuthHelper.setToken(result);
                navigate("/");
            }else{
                setMessage("❌ Invalid username or password.");
            }
        })

    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#e9f0fa" }}
        >
            <div
                className="card shadow p-5 text-center"
                style={{ maxWidth: 500, width: "100%", borderRadius: "1.5rem", fontSize: "90%" }}
            >
                <h3 className="fw-bold mb-4 text-primary">Sign In</h3>



                <div className="mb-4 text-start">
                    <label htmlFor="username" className="form-label fw-semibold">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="form-control form-control-lg"
                        maxLength={255}
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-4 text-start">
                    <label htmlFor="password" className="form-label fw-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        maxLength={255}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {message && (
                    <div
                        className={`alert ${
                            message.includes("✅")
                                ? "alert-success"
                                : "alert-danger"
                        }`}
                        role="alert"
                    >
                        {message}
                    </div>
                )}
                <button
                    className="btn btn-primary w-100 py-2 fs-5"
                    style={{
                        backgroundColor: "#0D47A1",
                        borderColor: "#0D47A1",
                    }}
                    onClick={handleLoginClick}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
