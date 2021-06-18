import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const postInfo = (url, data, callback, errorCallback) => {
  axios
    .post(url, data)
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
};
