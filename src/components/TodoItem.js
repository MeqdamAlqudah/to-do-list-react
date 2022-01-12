/* eslint-disable react/forbid-prop-types */
import { useState } from 'react';
import { FcFullTrash } from 'react-icons/fc';
import PropTypes from 'prop-types';
import styles from './TodoItem.module.css';

function TodoItem(props) {
  const [editing, setEditing] = useState(false);
  const completedStyle = {
    fontStyle: 'italic',
    color: '#595959',
    opacity: 0.4,
    textDecoration: 'line-through',
  };
  const handleEditing = () => {
    setEditing(!editing);
  };
  const viewMode = {};
  const editMode = {};

  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }
  const handleUpdatedDone = (e) => {
    if (e.key === 'Enter') {
      setEditing(!editing);
    }
  };
  const { todo } = props;
  const { title } = todo;
  const { id } = todo;
  const { deleteTodoProps } = props;
  const { completed } = todo;
  const { handleChangeProps } = props;
  const { setUpdate } = props;
  return (

    <li className={styles.item}>
      <div onDoubleClick={handleEditing}>
        <input className={styles.checkbox} type="checkbox" checked={completed} onChange={() => (handleChangeProps(id))} style={viewMode} value={title} />
        <button
          type="button"
          onClick={() => deleteTodoProps(id)}
        >
          <FcFullTrash
            cstyle={{ color: 'orangered', fontSize: '16px' }}
          />
        </button>
        <span style={todo.completed ? completedStyle : null}>
          {todo.title}
        </span>
      </div>
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        onChange={(e) => {
          setUpdate(e.target.value, id);
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>

  );
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  todo: PropTypes.array.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
};

export default TodoItem;
