import axios from 'axios';
import history from './history';
const appID = "b7u5og7z2mpu6LzWniQnYnR9";
const appSecret = "mrbx74x6kvDBHqMsZLskRac1";

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

// 拦截器， 对get请求进行预处理
instance.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token');
  if (xToken) {
    config.headers['Authorization'] = `Bearer ${xToken}`;
  }
  return config;
}, function (error) {
  console.error(error);
  return Promise.reject(error);
});

// 拦截器，对post返回数据进行预处理
instance.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token']);
  }
  return response;
}, function (error) {
  if (error.response.status === 401) {
    history.push('login');
  }
  return Promise.reject(error);
});

export default instance;