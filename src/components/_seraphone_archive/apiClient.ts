// src/lib/apiClient.ts
import axios from 'axios';
import { getToken, removeToken } from '@/api';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true', // For local dev with ngrok
  },
});

// Request Interceptor: Automatically attach the auth token
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Automatically handle 401s globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized! Clearing token and redirecting to login.');
      removeToken();
      // Force a hard redirect to clear state, or use a global event emitter to trigger React Router
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
