import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for session cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include CSRF token
api.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

// Helper function to get cookie by name
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/api/auth/register/', userData),
  login: (credentials) => api.post('/api/auth/login/', credentials),
  logout: () => api.post('/api/auth/logout/'),
  getProfile: () => api.get('/api/auth/profile/'),
  getUser: (userId) => api.get(`/api/auth/user/${userId}/`),
};

// Posts API calls
export const postsAPI = {
  getAllPosts: () => api.get('/api/posts/'),
  createPost: (postData) => api.post('/api/posts/', postData),
  getPost: (postId) => api.get(`/api/posts/${postId}/`),
  updatePost: (postId, postData) => api.put(`/api/posts/${postId}/`, postData),
  deletePost: (postId) => api.delete(`/api/posts/${postId}/`),
  getUserPosts: (userId) => api.get(`/api/users/${userId}/posts/`),
  getStats: () => api.get('/api/stats/'),
};

export default api;
