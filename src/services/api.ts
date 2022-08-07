import axios from 'axios';

const sobre12Api = axios.create({
  baseURL:
    'http://sobre12-backend.herokuapp.com/api',
  headers: {
    Accept: 'application/json',
  },
});

export default sobre12Api;
