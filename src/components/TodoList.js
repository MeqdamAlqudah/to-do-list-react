import React from 'react';
import TodoItem from './TodoItem';
function TodoList(props) {
    return (
        <ul>
            {props.todos.map(todo => <TodoItem
                setUpdate={props.setUpdate} key={todo.id} todo={todo} handleChangeProps={props.handleChangeProps}
                deleteTodoProps={props.deleteTodoProps} />
            )}
        </ul>
    )

}

export default TodoList;