import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoginProvider} from "./context/LoginContext.tsx";
import Login from "./pages/Login.tsx";
import {MovieProvider} from "./context/MovieContext.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LoginProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <MovieProvider>
                                <Home />
                            </MovieProvider>
                        }
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<>Not Found</>} />
                </Routes>
            </LoginProvider>
        </BrowserRouter>
    </React.StrictMode>
);
