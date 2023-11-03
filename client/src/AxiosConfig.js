import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001' || 'https://seans-dinners-server.onrender.com/',
});

export default instance;