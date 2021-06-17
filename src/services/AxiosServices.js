import axios from 'axios';
import { API_URI, ADD_HABIT_URL } from '../config';

const axiosService = axios.create({
  baseURL: `${API_URI}`,
  headers: { 'Content-Type': 'application/json' },
});

export function postInfo(url, data, callback, errorCallback) {
  axios
    .post(url, data)
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
}

export function postHabit(data, callback) {
  const user = localStorage.getItem('user');
  const { token } = JSON.parse(user);
  axiosService.defaults.headers.common.Authorization = `Bearer ${token}`;
  axiosService
    .post(`${ADD_HABIT_URL}`, data)
    .then((response) => callback(response));
}

export const postInfowithToken = (url, data, callback, errorCallback) => {
  const user = localStorage.getItem('user');
  const { token } = JSON.parse(user);
  axiosService.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios
    .post(url, data)
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
};

export const getInfowithToken = (url, callback, errorCallback) => {
  const user = localStorage.getItem('user');
  let token = null;
  if (user !== null) {
    token = JSON.parse(user);
  }
  axiosService.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios
    .get(url)
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
};
