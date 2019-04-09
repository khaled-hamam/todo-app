import axios from 'axios';
import notification from 'antd/lib/notification';
import { logoutUser } from './authToken';

// Setting base URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Setting up interceptors
axios.interceptors.response.use(
  response => {
    // response interceptor
    return response;
  },
  error => {
    // error interceptor
    console.log(error);
    switch (error.response.status) {
      case 401:
        logoutUser();
        break;
      case 500:
        notification.error({
          message: 'An error occured',
          description: 'Please try again later.'
        });
      // eslint-disable-next-line no-fallthrough
      default:
    }

    return Promise.reject(error);
  }
);
