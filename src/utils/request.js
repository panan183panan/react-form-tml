import axios from 'axios'
import Nprogress from 'nprogress'
// import {BASE_URL} from'../config/conster'

var instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
})

axios.interceptors.request.use(function (config) {
    Nprogress.start()
    return config;
  }, function (error) {
    Nprogress.done()
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    Nprogress.done()
    return response;
  }, function (error) {
    Nprogress.done()
    return Promise.reject(error);
  });


export default instance