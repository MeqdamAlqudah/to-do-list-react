import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

class InputTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { title } = this.state;
    const { addTodoProps } = this.props;
    e.preventDefault();
    if (title.trim()) {
      addTodoProps(title);
      this.setState({
        title: '',
      });
    } else {
      alert('Please write item');
    }
    e.target[0].value = '';
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <input name="title" onChange={this.onChange} type="text" placeholder="Add Todo..." className="input-text" />
        <button type="button" className="input-submit">
          {' '}
          <FaPlusCircle style={{ color: 'darkcyan', fontSize: '20px', marginTop: '2px' }} />
        </button>
      </form>
    );
  }
}

InputTodo.propTypes = {
  addTodoProps: PropTypes.func.isRequired,
};
export default InputTodo;
