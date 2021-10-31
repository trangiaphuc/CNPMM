import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    baseUrl: process.env.REACT_API_BASE,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async(config) => {
    return config;
})

axiosClient.interceptors.request.use(async(response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});
export default axiosClient;