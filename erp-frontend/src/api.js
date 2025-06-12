import axios from 'axios';

// Base API configuration
const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Django API base URL
});
export default API;
// Function to register users
export const registerUser = async (userData) => {
    try {
        const response = await API.post('/register/', userData);
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

//  function (matches Django's /auth/token/ route)
export const loginUser = async (credentials) => {
    try {
        const response = await API.post('/auth/login/'.trim(), credentials); // Corrected endpoint
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};
