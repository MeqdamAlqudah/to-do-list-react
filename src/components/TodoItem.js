import styles from "./TodoItem.module.css"
import { useState } from "react"
import { FcFullTrash } from "react-icons/fc";
function TodoItem(props) {
    const [editing, setEditing] = useState(false);
    const completedStyle = {
        fontStyle: "italic",
        color: "#595959",
        opacity: 0.4,
        textDecoration: "line-through",
    }
    const handleEditing = () => {
        setEditing(!editing);
    }
    let viewMode = {}
    let editMode = {}

    if (editing) {
        viewMode.display = "none"
    } else {
        editMode.display = "none"
    }
    const handleUpdatedDone = (e) => {
        if (e.key === "Enter") {
            setEditing(!editing);
        }
    }
    const title = props.todo.title;
    const id = props.todo.id;
    return (

        <li className={styles.item}>
            <div onDoubleClick={handleEditing}>
                <input className={styles.checkbox} type="checkbox" checked={props.todo.completed} onChange={() => (props.handleChangeProps(id))} style={viewMode} value={title} />
                <button onClick={() => props.deleteTodoProps(id)}>
                    <FcFullTrash cstyle={{ color: "orangered", fontSize: "16px" }} />
                </button>
                <span style={props.todo.completed ? completedStyle : null}>
                    {props.todo.title}
                </span>
            </div>
            <input type="text" style={editMode} className={styles.textInput} onChange={e => {
                props.setUpdate(e.target.value, id)
            }} onKeyDown={handleUpdatedDone} />
        </li>

    )

}

export default TodoItem;