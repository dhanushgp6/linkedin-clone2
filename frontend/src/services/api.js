import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://linkedin-clone2-production.up.railway.app'   // ← your Railway URL
    : 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// api.js  – add after the axios.create block
function getCookie (name) {
  const value = document.cookie.match(`(^|;)\\s*${name}=([^;]*)`);
  return value ? value.pop() : '';
}

api.interceptors.request.use(config => {
  const csrf = getCookie('csrftoken');     // Django sets this cookie
  if (csrf) config.headers['X-CSRFToken'] = csrf;
  return config;
});



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
  createPost: (postData) => {
    console.log('🚀 Creating post:', postData);
    return api.post('/api/posts/', postData);
  },
  getPost: (postId) => api.get(`/api/posts/${postId}/`),
  updatePost: (postId, postData) => api.put(`/api/posts/${postId}/`, postData),
  deletePost: (postId) => api.delete(`/api/posts/${postId}/`),
  getUserPosts: (userId) => api.get(`/api/users/${userId}/posts/`),
  getStats: () => api.get('/api/stats/'),
};

export default api;
