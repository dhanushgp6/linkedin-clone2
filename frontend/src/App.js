import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// We'll create these components next
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Header from './components/Layout/Header';

import './App.css';

// Custom component to conditionally render Header
const ConditionalHeader = () => {
  const location = useLocation();
  // Hide header on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  return <Header />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Render header only on non-auth pages */}
          <ConditionalHeader />

          <main className="container-fluid">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/profile/:userId" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
