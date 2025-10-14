import React from 'react';
// Cài đặt react-icons: npm install react-icons
import { Bell, List, Moon } from 'react-bootstrap-icons';

const Header: React.FC = () => {
    return (
        <header className="header d-flex justify-content-between align-items-center p-3">
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a href="#" className="text-decoration-none">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </nav>
            </div>
            <div className="d-flex align-items-center">
                <Bell size={18} className="me-3" />
                <List size={18} className="me-3" />
                <Moon size={18} className="me-4" />
                <img
                    src="https://i.pravatar.cc/40"
                    alt="User Avatar"
                    className="rounded-circle"
                />
            </div>
        </header>
    );
};

export default Header;