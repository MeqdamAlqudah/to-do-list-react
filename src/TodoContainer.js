/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import Header from './components/Header';
import InputTodo from './components/InputTodo';
import About from './functionBased/About';
import NotMatch from './functionBased/NotMatch';
import Navbar from './components/Navbar';

let todoArray = JSON.parse(localStorage.getItem('todoArray') || '[]');
const componentDidMount = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((data) => localStorage.setItem('todoArray', JSON.stringify(data)));
};
if (!todoArray.length) {
  componentDidMount();
}
function TodoContainer() {
  const [currentTodo, changeTodos] = useState({ todos: todoArray });
  const handleChange = (id) => {
    todoArray = {
      todos: currentTodo.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    };
    changeTodos(todoArray);
    localStorage.setItem('todoArray', JSON.stringify(todoArray.todos));
  };
  const delTodo = (id) => {
    todoArray = {
      todos: [
        ...currentTodo.todos.filter((todo) => todo.id !== id),
      ],
    };
    changeTodos(todoArray);

    localStorage.setItem('todoArray', JSON.stringify(todoArray.todos));
  };
  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    todoArray = {
      todos: [...currentTodo.todos, newTodo],
    };
    changeTodos(todoArray);
    localStorage.setItem('todoArray', JSON.stringify(todoArray.todos));
  };
  const setUpdate = (updatedTitle, id) => {
    todoArray = {
      todos: currentTodo.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    };
    changeTodos(todoArray);
    localStorage.setItem('todoArray', JSON.stringify(todoArray.todos));
  };
  return (

    <Routes>
      <Route
        exact
        path="/"
        element={(
          <div className="container">
            <Navbar />
            <div className="inner">
              <Header />
              <InputTodo addTodoProps={addTodoItem} />
              <TodoList
                setUpdate={setUpdate}
                todos={currentTodo.todos}
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
