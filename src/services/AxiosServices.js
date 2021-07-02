import axios from 'axios';
import {
  API_URL,
  HABITS_URL,
  ADD_HABIT_URL,
  REQUEST_ACTIVITES_URL,
} from '../config';

const axiosService = axios.create({
  baseURL: `${API_URL}`,
  headers: { 'Content-Type': 'application/json' },
});

const getAuthHeader = () => {
  const user = localStorage.getItem('user');
  let token = null;

  if (user !== null) {
    token = JSON.parse(user).token;
    return `Bearer ${token}`;
  }
  return null;
};

const requestHandler = (request) => {
  request.headers.Authorization = getAuthHeader();
  return request;
};

axiosService.interceptors.request.use((request) => requestHandler(request));

export async function postHabit(data) {
  return axiosService.post(`${ADD_HABIT_URL}`, data);
}

export async function getHabit(params) {
  return axiosService.get(`${HABITS_URL}/${params}`);
}

export async function updateHabit(data, params) {
  return axiosService.put(`${HABITS_URL}/${params}`, data);
}

export async function removeHabit(params) {
  return axiosService.delete(`${HABITS_URL}/${params}`);
}

export async function getListActivities(params) {
  return axiosService.get(`${REQUEST_ACTIVITES_URL}`, { params });
}

export function postInfo(url, data, callback, errorCallback) {
  axiosService
    .post(url, data)
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
}

export async function postHabitWithToken(url, data) {
  return axiosService.post(url, data);
}

export const postInfowithToken = (url, data, callback, errorCallback) => {
  axiosService
    .post(url, data)
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
};

export const getInfowithToken = (url, callback, errorCallback) => {
  axiosService
    .get(url)
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
};
