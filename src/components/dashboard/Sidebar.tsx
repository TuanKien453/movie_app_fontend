import React, { useState } from 'react';
import {
    Speedometer2, Film, Tag, Puzzle, FileEarmark, ChevronDown, PeopleFill
} from 'react-bootstrap-icons';
import {Link} from "react-router-dom";

const Sidebar: React.FC = () => {
    const [componentsOpen, setComponentsOpen] = useState(false);
    const [pagesOpen, setPagesOpen] = useState(false);

    return (
        <aside className="sidebar vh-100 p-3 d-flex flex-column">
            <h4 className="text-center text-white mb-4">COREUI</h4>
            <nav className="flex-grow-1">
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="/dashboard" className="nav-link text-white active rounded d-flex align-items-center" >
                            <Speedometer2 className="me-3" /> Dashboard
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/movies" className="nav-link text-white rounded d-flex align-items-center">
                            <Film className="me-3" /> Movies
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/genres" className="nav-link text-white rounded d-flex align-items-center">
                            <Tag className="me-3" /> Genre
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/humans" className="nav-link text-white rounded d-flex align-items-center">
                            <PeopleFill className="me-3" /> Human
                        </Link>
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


                </ul>
            </nav>
            <div>
                <a href="#" className="btn btn-primary w-100">Try CoreUI PRO</a>
            </div>
        </aside>
    );
};

export default Sidebar;