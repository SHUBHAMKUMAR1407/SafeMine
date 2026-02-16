import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://safemine-wx7i.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: if backend replies with HTML (e.g., proxy error page), attach rawText
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error && error.response && error.response.headers) {
      const ct = error.response.headers['content-type'] || '';
      if (ct.includes('text/html')) {
        try {
          // try to read raw text body if available
          const text = error.response.data;
          error.response.rawText = text;
        } catch (e) {
          // ignore
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
