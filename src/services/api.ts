import axios from 'axios';

const sobre12Api = axios.create({
  baseURL:
    'http://10.0.2.2:3333/api',
  headers: {
    Accept: 'application/json',
  },
});

export default sobre12Api;
