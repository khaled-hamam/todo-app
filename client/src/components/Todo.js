import React from 'react';
import axios from 'axios';

const Todo = props => {
  const { id, name, isDone, onTodosChange } = props;
  let nameChild = name;

  if (isDone) {
    nameChild = <del>{name}</del>;
  }

  const deleteTodo = async () => {
    const response = await axios.delete(`/api/todos/${id}`);
    onTodosChange(response.data);
  };

  const changeTodoState = async () => {
    const response = await axios.put(`/api/todos/${id}`, { state: !isDone });
    onTodosChange(response.data);
  };

  return (
    <div className="card col-md-6 d-flex flex-row align-items-center my-1">
      <div className="card-body d-flex">
        <input
          type="checkbox"
          className="form-check-input"
          onChange={changeTodoState}
          checked={isDone}
        />
        <span className="card-text flex-grow-1 m-0">{nameChild}</span>
      </div>
      <button type="button" className="btn btn-danger h-50" onClick={deleteTodo}>
        X
      </button>
    </div>
  );
};

export default Todo;
