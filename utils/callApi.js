import axios from "axios";
import { baseUrl } from '../config';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000
});

instance.interceptors.request.use((config) => {
  
  return config;
}, (error) => {

  return Promise.reject(error);
}
);

instance.interceptors.response.use((response) => {
  
  return response;
}, (error) => {

  return Promise.reject(error);
}
);

export default instance;