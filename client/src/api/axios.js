import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Depending on server URL
});

// Intercept requests and add authorization token
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const parsed = JSON.parse(userInfo);
    if (parsed.token) {
      req.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }
  return req;
});

// Intercept responses for auth errors to handle auto-logout (Optional but good)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('userInfo');
      window.location.href = '/login'; // Redirect on unauthorized
    }
    return Promise.reject(err);
  }
);

export default API;
