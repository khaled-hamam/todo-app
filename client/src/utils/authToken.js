import * as jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import axios from 'axios';
import message from 'antd/lib/message';

export const checkAuthToken = () => {
  const cookies = new Cookies();
  const token = cookies.get('Authorization');
  setDefaultHeader(token);

  if (token) {
    return decodeToken(token);
  }

  return undefined;
};

const setDefaultHeader = token => {
  if (token) {
    // Applies the token in every request
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const decodeToken = token => {
  return jwt_decode(token);
};

export const setAuthToken = token => {
  // Set cookie with Token
  const cookies = new Cookies();
  cookies.set('Authorization', token);

  setDefaultHeader(token);

  message.success('Welcome back');
};

export const logoutUser = () => {
  // Remove from Cookies
  const cookies = new Cookies();
  cookies.remove('Authorization');

  // Remove default header
  setDefaultHeader(false);

  message.success('Bye Bye 👋🏻');
};
