import axios from 'axios';

export default axios.create({
  baseURL: `http://192.168.1.31:8080/api/`
});