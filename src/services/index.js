import axios from "axios";

const service = axios.create({
    baseURL: process.env.VUE_APP_URL
})

service.interceptors.request.use(
    config => {
        config.headers = {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
            "Content-Type": 'application/json'
        };
        return config;
    },
    error => Promise.reject(error)
)

export default service