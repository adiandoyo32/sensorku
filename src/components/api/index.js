import axios from "axios";

const token = "auth";
axios.interceptors.request.use((req) => {
  req.headers = {
    Authorization: "Bearer " + token,
  };
  return req;
});

export { axios };
