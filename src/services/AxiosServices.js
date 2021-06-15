import axios from 'axios';

export default function postInfo(url, data, callback, errorCallback) {
  axios
    .post(url, data)
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
}
