import axios from "axios";

export default axios.create({
  //baseURL: `http://192.168.122.124:8080/api/`
  baseURL: `http://172.20.10.2:8080/api/`,
});
