import axios, { AxiosInstance } from "axios";


const baseUrl = import.meta.env.VITE_BASEURL_SERVICE || 'http://localhost:8081'

const http:AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-type": "application/json",
    },
});

export default http;