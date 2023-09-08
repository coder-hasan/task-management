// import React from 'react';

import { NavLink, useNavigate } from "react-router-dom";

const LoginNav = () => {
    const history = useNavigate()
      const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('access-token');
        history('/');
        window.location.reload()
        // setIsLoggedIn(false);
      };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Task Management</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item ">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create-task">Create Task</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink onClick={handleLogout} className="nav-link" to="/home">Log Out</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default LoginNav;