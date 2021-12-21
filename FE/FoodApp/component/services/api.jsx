import axios from 'axios';

export default axios.create({

  baseURL: `http://192.168.43.234:8080/api/`
 
});