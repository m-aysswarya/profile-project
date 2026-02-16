import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_URL;

const API = axios.create({
    baseURL: apiUrl,
});

export default API;