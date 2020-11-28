import axios from "axios";

// const token = "auth";
// axios.interceptors.request.use((req) => {
//   req.headers = {
//     Authorization: "Bearer " + token,
//   };
//   return req;
// });

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');