// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoginProvider} from "./context/LoginContext.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import GenrePage from "./pages/admin/GenrePage.tsx";
import HumanPage from "./pages/admin/HumanPage.tsx";
import './style/index.css';
import Detail from "./pages/Detail.tsx";
import Watch from "./pages/Watch.tsx";
import Error from "./pages/Error.tsx";
import MoviePage from "./pages/admin/MoviePage.tsx";
import MovieContentPage from "./pages/admin/MovieContentPage.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <LoginProvider>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="/watch/:id" element={<Watch />} />
                    <Route path="/" element={<DashboardLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="movies" element={<MoviePage />} />
                        <Route path="genres" element={<GenrePage />} />
                        <Route path="humans" element={<HumanPage />} />
                        <Route path="movie/:movieId/content" element={<MovieContentPage />} />
                    </Route>
                    <Route path="*" element={<Error/>} />

                </Routes>
            </LoginProvider>
        </BrowserRouter>
    // </React.StrictMode>
);
