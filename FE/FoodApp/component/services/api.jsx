import axios from 'axios';

export default axios.create({

  baseURL: `http://192.168.109.124:8080/api/`
 
});