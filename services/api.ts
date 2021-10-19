import axios from 'axios';

const sobre12Api = axios.create({
  baseURL:
    'http://192.168.0.13:3000/api',
  headers: {
    Accept: 'application/json',
  },
});

export default sobre12Api;
