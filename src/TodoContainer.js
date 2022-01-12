/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import Header from './components/Header';
import InputTodo from './components/InputTodo';
import About from './functionBased/About';
import NotMatch from './functionBased/NotMatch';

let ToDoArray = JSON.parse(localStorage.getItem('ToDoArray') || '[]');
const componentDidMount = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((data) => localStorage.setItem('ToDoArray', JSON.stringify(data)));
};
if (!ToDoArray.length) {
  componentDidMount();
}
function TodoContainer() {
  const [CurrentTodo, ChangeTodos] = useState({ todos: ToDoArray });
  const handleChange = (id) => {
    ToDoArray = {
      todos: CurrentTodo.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    };
    ChangeTodos(ToDoArray);
    localStorage.setItem('ToDoArray', JSON.stringify(ToDoArray.todos));
  };
  const delTodo = (id) => {
    ToDoArray = {
      todos: [
        ...CurrentTodo.todos.filter((todo) => todo.id !== id),
      ],
    };
    ChangeTodos(ToDoArray);

    localStorage.setItem('ToDoArray', JSON.stringify(ToDoArray.todos));
  };
  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    ToDoArray = {
      todos: [...CurrentTodo.todos, newTodo],
    };
    ChangeTodos(ToDoArray);
    localStorage.setItem('ToDoArray', JSON.stringify(ToDoArray.todos));
  };
  const setUpdate = (updatedTitle, id) => {
    ToDoArray = {
      todos: CurrentTodo.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    };
    ChangeTodos(ToDoArray);
    localStorage.setItem('ToDoArray', JSON.stringify(ToDoArray.todos));
  };
  return (

    <Routes>
      <Route
        exact
        path="/"
        element={(
          <div className="container">
            <div className="inner">
              <Header />
              <InputTodo addTodoProps={addTodoItem} />
              <TodoList
                setUpdate={setUpdate}
                todos={CurrentTodo.todos}
                handleChangeProps={handleChange}
                deleteTodoProps={delTodo}
              />
            </div>
          </div>
        )}
      />
      <Route path="/about" element={<About />} />

      <Route path="*" element={<NotMatch />} />
    </Routes>

  );
}

export default TodoContainer;
