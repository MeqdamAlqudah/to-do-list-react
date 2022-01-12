import React from "react"
import { v4 as uuidv4 } from "uuid";
import { FaPlusCircle } from "react-icons/fa"
class InputTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ id: uuidv4(), [e.target.name]: e.target.value, completed: false });
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.title.trim()) {
            this.props.addTodoProps(this.state.title)
            this.setState({
                title: "",
            })
        } else {
            alert("Please write item")
        }
        e.target[0].value = '';
    }
    render() {


        return (
            <form onSubmit={this.handleSubmit} className="form-container">
                <input name="title" onChange={this.onChange} type="text" placeholder="Add Todo..." className="input-text" />
                <button className="input-submit" >  <FaPlusCircle style={{ color: "darkcyan", fontSize: "20px", marginTop: "2px" }} /></button>
            </form>
        )
    }
}
export default InputTodo