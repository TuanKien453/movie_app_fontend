import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout.tsx';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
            </Route>

        </Routes>
    );
};

export default App;
