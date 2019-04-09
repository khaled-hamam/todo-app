import React, { Component } from 'react';
import LoginBar from '../components/LoginBar';
import { checkAuthToken, setAuthToken, decodeToken, logoutUser } from '../utils/authToken';
import '../utils/axios.config';
import TodosView from './TodosView';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      loginEmail: '',
      loginPassword: ''
    };
  }

  componentDidMount() {
    const user = checkAuthToken();
    if (user !== undefined) {
      this.setState({ user });
    }
  }

  onLoginSuccess = token => {
    setAuthToken(token);
    const user = decodeToken(token);
    this.setState({ user });
  };

  onLogout = () => {
    logoutUser();
    this.setState({ user: undefined });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <body className="App">
        <header className="App-header">
          <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand" href="/">
              Todo App
            </a>
            {this.state.user ? (
              <button className="btn btn-outline-light my-2 my-sm-0" onClick={this.onLogout}>
                Logout
              </button>
            ) : (
              <LoginBar
                onLogin={this.onLoginSuccess}
                email={this.state.loginEmail}
                password={this.state.loginPassword}
                onFormChange={this.onChange}
              />
            )}
          </nav>
        </header>
        {this.state.user ? <TodosView /> : <p>Please Login to view your Todos.</p>}
      </body>
    );
  }
}

export default App;
