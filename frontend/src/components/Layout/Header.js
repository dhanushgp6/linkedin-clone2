import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          LinkedIn Clone
        </Link>
        
        <div className="navbar-nav ms-auto">
          {isAuthenticated ? (
            <>
              <span className="navbar-text me-3">
                Welcome, {user?.full_name || user?.username}!
              </span>
              <Link className="nav-link me-3" to="/">Home</Link>
              <Link className="nav-link me-3" to={`/profile/${user?.id}`}>Profile</Link>
              <button 
                className="btn btn-outline-light btn-sm" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link me-3" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
