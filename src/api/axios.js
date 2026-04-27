import axios from 'axios';

const configuredBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
const fallbackBaseUrl = import.meta.env.DEV ? 'http://localhost:8080/api' : '';
const normalizedBaseUrl = (configuredBaseUrl || fallbackBaseUrl).replace(/\/$/, '');

const API = axios.create({
  baseURL: normalizedBaseUrl,
  withCredentials: true,
});

export default API;
