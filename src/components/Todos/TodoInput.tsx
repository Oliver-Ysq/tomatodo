import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions';
import axios from '../../config/axios';

interface ITodoInputState {
  description: string;
}
interface ITodoInputProps {
  addTodo: (payload: any) => any;
}
class TodoInput extends Component<ITodoInputProps, ITodoInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    };
  }
  addTodo = async () => {
    try {
      let response = await axios.post('todos', { description: this.state.description });
      this.props.addTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
    // this.props.addTodo({ description: this.state.description });
    this.setState({ description: '' });
  };
  render() {
    const { description } = this.state;
    const suffix = description ? <Icon type="enter" onClick={this.addTodo} /> : <span />;
    return (
      <div id="TodoInput">
        <Input
          placeholder="添加待办事项 . . ."
          suffix={suffix}
          value={description}
          onPressEnter={this.addTodo}
          onChange={(e) => this.setState({ description: e.target.value })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  // todos: state.todos,
  ...ownProps
});
const mapDispatchToProps = {
  addTodo
};


export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);