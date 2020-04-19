import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://colory-zeit-node-backend.now.sh',
});

export default instance;
