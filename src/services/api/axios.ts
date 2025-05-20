// api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/v1", // <-- Updated with /v1
  headers: {
    "Content-Type": "application/json",
  },
  // You could also add other default configs here like:
  timeout: 10000, // 10 second timeout
  withCredentials: true // if you need to send cookies
});

// Optional: Add interceptors
api.interceptors.request.use(config => {
  // You could add auth tokens here
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;