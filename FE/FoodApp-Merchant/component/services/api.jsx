import axios from "axios";

export default axios.create({
  baseURL: `http://172.16.192.6:8080/api/`,
  //baseURL: `http://172.20.10.8:8080/api/`,
});
