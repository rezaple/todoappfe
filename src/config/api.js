import axios from 'axios';
import {useNavigate} from "react-router";

const baseURL = import.meta.env.VITE_APP_API_URL;

const apiClient = axios.create({
  baseURL: baseURL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token"); // Get access token from the local storage
    
if (accessToken) { // if access token is present, add it to the bearer-token
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => { // Error-handling
    console.error("Request error ::", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

  // Check if error response is present and error status is 401 or 403
    if (error.response && (error.response.status === 401 || error.response.status === 403)
    ) {
      console.error("Response error :: ", error.response);
      localStorage.removeItem('token');
      const navigate = useNavigate(); m
      navigate("/login");

      return await Promise.reject(refreshError);
    }
    return Promise.reject(error);
  }
);

export default apiClient;