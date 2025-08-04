import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
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
