import React from 'react';
import axios from 'axios';
import message from 'antd/lib/message';

const LoginBar = props => {
  const { onLogin, email, password, onFormChange } = props;

  const submitLogin = async event => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    try {
      const result = await axios.post('/api/users/login', { email, password });
      onLogin(result.data.token);
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        message.error('Invalid Email or Password');
      }
    }
  };

  return (
    <form className="form-inline" onSubmit={submitLogin}>
      <input
        className="form-control mr-sm-2"
        type="email"
        placeholder="Email"
        aria-label="Email"
        name="loginEmail"
        value={email}
        onChange={onFormChange}
      />
      <input
        className="form-control mr-sm-2"
        type="password"
        placeholder="Password"
        aria-label="Password"
        name="loginPassword"
        value={password}
        onChange={onFormChange}
      />
      <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginBar;
