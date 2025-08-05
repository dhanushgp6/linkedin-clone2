import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linkedinLogo = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match!');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    const result = await register(formData);
    
    if (result.success) {
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } else {
      let errorMsg = 'Registration failed. ';
      if (typeof result.error === 'object') {
        const errors = result.error;
        if (errors.email) errorMsg += 'Email: ' + errors.email.join(', ') + ' ';
        if (errors.username) errorMsg += 'Username: ' + errors.username.join(', ') + ' ';
        if (errors.password) errorMsg += 'Password: ' + errors.password.join(', ') + ' ';
        if (errors.non_field_errors) errorMsg += errors.non_field_errors.join(', ');
      } else {
        errorMsg += result.error;
      }
      setError(errorMsg);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Animated Background */}
      <div className="animated-bg"></div>
      
      <div style={styles.pageContainer}>
        <div style={styles.registerCard}>
          <div className="text-center">
            <img
              src={linkedinLogo}
              alt="LinkedIn"
              style={{ width: 60, marginBottom: 15 }}
            />
          </div>

          <h3 className="text-center mb-4" style={{color: '#333', fontWeight: '600'}}>
            Make the most of your professional life
          </h3>

          {error && <div className="alert alert-danger" style={{fontSize: '14px'}}>{error}</div>}
          {success && <div className="alert alert-success" style={{fontSize: '14px'}}>{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="first_name" className="form-label" style={styles.label}>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="last_name" className="form-label" style={styles.label}>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={styles.label}>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label" style={styles.label}>Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bio" className="form-label" style={styles.label}>Bio (Optional)</label>
              <textarea
                className="form-control"
                id="bio"
                name="bio"
                rows="2"
                value={formData.bio}
                onChange={handleChange}
                style={styles.input}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label" style={styles.label}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="password_confirm" className="form-label" style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password_confirm"
                  name="password_confirm"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn w-100"
              disabled={loading}
              style={styles.registerButton}
            >
              {loading ? 'Creating Account...' : 'Agree & Join'}
            </button>
          </form>

          <div className="text-center mt-4">
            <p style={{color: '#666', fontSize: '14px'}}>
              Already on LinkedIn?{' '}
              <Link to="/login" style={{color: '#0073b1', textDecoration: 'none', fontWeight: '600'}}>
                Sign in
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
  }

  /* Animated gradient background - FASTER 10s cycle */
  .animated-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(-45deg, #6a11cb, #2575fc, #764ba2, #667eea);
    background-size: 400% 400%;
    animation: gradientAnimation 10s ease infinite;
    z-index: -1;
  }

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
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
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    margin: '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  registerCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '20px',              // Reduced from 30px
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '420px',            // Reduced from 500px
    backdropFilter: 'blur(10px)',
    margin: '20px'
  },
  input: {
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    padding: '8px 12px',          // Slightly reduced padding
    fontSize: '14px',
    transition: 'border-color 0.2s'
  },
  label: {
    fontWeight: '500', 
    color: '#666',
    fontSize: '14px'
  },
  registerButton: {
    backgroundColor: '#0073b1',
    border: 'none',
    borderRadius: '24px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    height: '48px'
  }
};


export default Register;
