import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://linkedin-clone2-production.up.railway.app'
    : 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Fixed CSRF cookie getter
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

// Add CSRF token to all requests
api.interceptors.request.use(config => {
  const csrftoken = getCookie('csrftoken');
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken;
  }
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
