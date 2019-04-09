import React from 'react';
import axios from 'axios';

const TodoAddForm = props => {
  const { newTodoName, onFormChange, onTodosChange } = props;

  const submitTodo = async event => {
    event.preventDefault();
    const response = await axios.post('/api/todos', { name: newTodoName });
    onTodosChange(response.data);
  };

  return (
    <form className="form-inline my-5 col-md-4" style={{ display: 'flex' }} onSubmit={submitTodo}>
      <div className="form-group mx-1 mb-2 flex-grow-1">
        <input
          type="text"
          className="form-control w-100"
          placeholder="Create Todo"
          name="newTodoName"
          value={newTodoName}
          onChange={onFormChange}
        />
      </div>
      <button type="submit" className="btn btn-primary mb-2 mx-1">
        +
      </button>
    </form>
  );
};

export default TodoAddForm;
