import axios from 'axios';

// Create an Axios instance
const registerApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,  // Automatically loaded from .env file
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log("Base URL is: ", import.meta.env.VITE_BACKEND);  // Log the base URL

export { registerApi };