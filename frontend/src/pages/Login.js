import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linkedinLogo = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Login failed. Check your credentials.');
    }
    setLoading(false);
  };

  return (
    <>
      {/* Professional animated gradient background */}
      <div style={styles.gradientBackground}></div>
      
      <div style={styles.pageContainer}>
        <div style={styles.loginCard}>
          <div className="text-center">
            <img
              src={linkedinLogo}
              alt="LinkedIn"
              style={{ width: 80, marginBottom: 20 }}
            />
          </div>

          <h3 className="text-center mb-4" style={{color: '#333', fontWeight: '600'}}>Sign in</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{fontWeight: '500', color: '#666'}}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label" style={{fontWeight: '500', color: '#666'}}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 d-flex align-items-center justify-content-center"
              disabled={loading}
              style={styles.loginButton}
            >
              {loading ? (
                <>
                  <img
                    src={linkedinLogo}
                    alt="loading"
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 10,
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
            
            <div className="text-center mt-3" style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
              <small style={{ color: '#888888', fontSize: '12px', fontWeight: '500' }}>
                Crafted by Dhanush G P
              </small>
            </div>
          </form>

          <div className="text-center mt-4">
            <p style={{color: '#666', fontSize: '14px'}}>
              New to our platform?{' '}
              <Link to="/register" style={{color: '#0073b1', textDecoration: 'none', fontWeight: '600'}}>
                Join now
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
  /* Remove body margins and set full height */
  body, html, #root {
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: transparent !important; /* ← Add this line */
  }

  /* Ensure App container is also transparent */
  .App {
    background: transparent !important; /* ← Add this line */
  }

  /* Remove any Bootstrap container backgrounds */
  .container-fluid {
    background: transparent !important; /* ← Add this line */
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Hide scrollbars */
  body::-webkit-scrollbar {
    display: none;
  }
`}</style>

    </>
  );
};

const styles = {
  gradientBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(-45deg, #0a66c2, #378fe9, #6a11cb, #2575fc, #764ba2, #667eea)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 15s ease infinite',
    zIndex: -1
  },
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  loginCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '420px',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  input: {
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  loginButton: {
    background: 'linear-gradient(135deg, #0a66c2, #378fe9)',
    border: 'none',
    borderRadius: '24px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    transition: 'all 0.2s ease',
    height: '48px',
    boxShadow: '0 4px 15px rgba(10, 102, 194, 0.3)'
  }
};

export default Login;
