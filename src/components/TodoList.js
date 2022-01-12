/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList(props) {
  const { todos } = props;
  const { setUpdate } = props;
  const { handleChangeProps } = props;
  const { deleteTodoProps } = props;
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          setUpdate={setUpdate}
          key={todo.id}
          todo={todo}
          handleChangeProps={handleChangeProps}
          deleteTodoProps={deleteTodoProps}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  setUpdate: PropTypes.func.isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
};

export default TodoList;
