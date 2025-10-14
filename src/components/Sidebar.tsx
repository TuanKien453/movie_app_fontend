import React, { useState } from 'react';
import {
    Speedometer2, Droplet, Pencil, Puzzle, Send, PieChart, FileEarmarkText, Star, Bell, ColumnsGap, FileEarmark, Book, ChevronDown
} from 'react-bootstrap-icons';

const Sidebar: React.FC = () => {
    // State để quản lý việc đóng/mở các menu con
    const [componentsOpen, setComponentsOpen] = useState(false);
    const [pagesOpen, setPagesOpen] = useState(false);

    return (
        <aside className="sidebar vh-100 p-3 d-flex flex-column">
            <h4 className="text-center text-white mb-4">COREUI</h4>
            <nav className="flex-grow-1">
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white active rounded d-flex align-items-center" href="#">
                            <Speedometer2 className="me-3" /> Dashboard
                        </a>
                    </li>
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white rounded d-flex align-items-center" href="#">
                            <Droplet className="me-3" /> Colors
                        </a>
                    </li>
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white rounded d-flex align-items-center" href="#">
                            <Pencil className="me-3" /> Typography
                        </a>
                    </li>

                    <li className="nav-title mt-3 mb-2">COMPONENTS</li>

                    <li className="nav-item mb-2">
                        <a
                            className="nav-link text-white rounded d-flex justify-content-between align-items-center"
                            href="#"
                            onClick={(e) => { e.preventDefault(); setComponentsOpen(!componentsOpen); }}
                            aria-expanded={componentsOpen}
                        >
                            <div className="d-flex align-items-center">
                                <Puzzle className="me-3" /> Base
                            </div>
                            <ChevronDown />
                        </a>
                        {/* Menu con cho Components */}
                        {componentsOpen && (
                            <ul className="nav flex-column ps-4 mt-1">
                                <li className="nav-item"><a href="#" className="nav-link text-white rounded small">Accordion</a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white rounded small">Breadcrumb</a></li>
                            </ul>
                        )}
                    </li>

                    <li className="nav-item mb-2">
                        <a className="nav-link text-white rounded d-flex align-items-center" href="#">
                            <Send className="me-3" /> Buttons
                        </a>
                    </li>
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white rounded d-flex align-items-center" href="#">
                            <PieChart className="me-3" /> Charts
                        </a>
                    </li>
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white rounded d-flex align-items-center" href="#">
                            <FileEarmarkText className="me-3" /> Forms
                        </a>
                    </li>
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white rounded d-flex align-items-center" href="#">
                            <Star className="me-3" /> Icons
                        </a>
                    </li>
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white rounded d-flex align-items-center" href="#">
                            <Bell className="me-3" /> Notifications
                        </a>
                    </li>
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white rounded d-flex justify-content-between align-items-center" href="#">
                            <div className="d-flex align-items-center">
                                <ColumnsGap className="me-3" /> Widgets
                            </div>
                            <span className="badge bg-info">NEW</span>
                        </a>
                    </li>

                    <li className="nav-title mt-3 mb-2">EXTRAS</li>
                    <li className="nav-item mb-2">
                        <a
                            className="nav-link text-white rounded d-flex justify-content-between align-items-center"
                            href="#"
                            onClick={(e) => { e.preventDefault(); setPagesOpen(!pagesOpen); }}
                            aria-expanded={pagesOpen}
                        >
                            <div className="d-flex align-items-center">
                                <FileEarmark className="me-3" /> Pages
                            </div>
                            <ChevronDown />
                        </a>
                        {/* Menu con cho Pages */}
                        {pagesOpen && (
                            <ul className="nav flex-column ps-4 mt-1">
                                <li className="nav-item"><a href="#" className="nav-link text-white rounded small">Login</a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white rounded small">Register</a></li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-item mb-2">
                        <a className="nav-link text-white rounded d-flex align-items-center" href="#">
                            <Book className="me-3" /> Docs
                        </a>
                    </li>

                </ul>
            </nav>
            <div>
                <a href="#" className="btn btn-primary w-100">Try CoreUI PRO</a>
            </div>
        </aside>
    );
};

export default Sidebar;