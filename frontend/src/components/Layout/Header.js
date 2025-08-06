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

  // Letter-avatar fallback
  const avatarInitial =
    user?.full_name?.charAt(0).toUpperCase() ||
    user?.username?.charAt(0).toUpperCase() ||
    'U';

  return (
    <header className="linkedin-navbar shadow-sm">
      <div className="container-fluid">
        <div className="row w-100 align-items-center">
          {/* Left side - Brand */}
          <div className="col-auto">
            <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #0a66c2 0%, #378fe9 100%)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                in
              </div>
              <span className="fw-bold" style={{ fontSize: '20px', color: '#1d1d1d' }}>
                Linked<span style={{ color: '#0a66c2' }}>In</span> Clone
              </span>
            </Link>
          </div>

          {/* Right side - Navigation */}
          <div className="col d-flex justify-content-end">
            {isAuthenticated && (
              <nav className="d-flex align-items-center gap-4">
                <Link 
                  to="/" 
                  className="nav-link-custom d-flex flex-column align-items-center text-decoration-none"
                  style={{ minWidth: '60px' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09L23 9z"/>
                  </svg>
                  <small style={{ fontSize: '12px', marginTop: '2px' }}>Home</small>
                </Link>

                <Link
                  to={`/profile/${user?.id}`}
                  className="nav-link-custom d-flex flex-column align-items-center text-decoration-none"
                  style={{ minWidth: '60px' }}
                >
                  <div
                    className="avatar-circle"
                    style={{ width: '20px', height: '20px', fontSize: '11px', marginBottom: '2px' }}
                  >
                    {avatarInitial}
                  </div>
                  <small style={{ fontSize: '12px' }}>Me</small>
                </Link>

                <div className="vr" style={{ height: '30px', opacity: 0.3 }}></div>

                <button
                  onClick={handleLogout}
                  className="btn btn-linkedin btn-sm d-flex align-items-center gap-2"
                  style={{ 
                    padding: '6px 16px', 
                    fontSize: '14px',
                    borderRadius: '16px',
                    fontWeight: '500'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5z"/>
                  </svg>
                  Sign out
                </button>
              </nav>
            )}

            {!isAuthenticated && (
              <nav className="d-flex align-items-center gap-3">
                <Link to="/login" className="nav-link-custom">
                  Sign in
                </Link>
                <Link to="/register" className="btn btn-linkedin btn-sm">
                  Join now
                </Link>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
