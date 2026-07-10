import axios from 'axios';

// Base axios instance – in production point to your real API
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const user = localStorage.getItem('luxeshop_current_user');
  if (user) {
    try {
      const { id } = JSON.parse(user);
      config.headers['X-User-Id'] = id;
    } catch {}
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    console.error('[API Error]', err.message);
    return Promise.reject(err);
  }
);

export default api;
