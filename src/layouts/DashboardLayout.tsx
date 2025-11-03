import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar.tsx';
import Header from '../components/Header';
import styles from '../style/Dashboard.module.css';

const DashboardLayout: React.FC = () => {
    return (
        <div className={styles.dashboard}>
            <div className="d-flex" style={{ minHeight: '100vh' }}>
                {/* Sidebar */}
                <Sidebar />

                <div className="flex-grow-1 d-flex flex-column">
                    <Header />
                    <main className="p-4 flex-grow-1">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
