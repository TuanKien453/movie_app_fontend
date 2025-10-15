import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout.tsx';
import Dashboard from './pages/admin/Dashboard.tsx';
import Home from './pages/Home';
import About from './pages/About';
import MoviePage from "./pages/admin/MoviePage.tsx";
import GenrePage from "./pages/admin/GenrePage.tsx";
import HumanPage from "./pages/admin/HumanPage.tsx";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />

            <Route path="/" element={<DashboardLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="movies" element={<MoviePage />} />
                <Route path="genres" element={<GenrePage />} />
                <Route path="humans" element={<HumanPage />} />
            </Route>
        </Routes>
    );
};

export default App;
