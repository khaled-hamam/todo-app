import React, { Component } from 'react';
import axios from 'axios';
import TodoAddForm from '../components/TodoAddForm';
import Todo from '../components/Todo';

export default class TodosView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodoName: ''
    };
  }

  async componentDidMount() {
    const response = await axios.get('/api/todos');
    this.setState({ todos: response.data });
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onTodosChange = todos => {
    this.setState({ todos });
  };

  render() {
    return (
      <div className="todos">
        <TodoAddForm
          newTodoName={this.state.newTodoName}
          onFormChange={this.onChange}
          onTodosChange={this.onTodosChange}
        />
        {this.state.todos.map(todo => (
          <Todo
            key={todo._id}
            id={todo._id}
            name={todo.name}
            isDone={todo.isDone}
            onTodosChange={this.onTodosChange}
          />
        ))}
      </div>
    );
  }
}
