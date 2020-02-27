import React, { Component } from 'react';
import { Input, Icon } from 'antd';

interface ITodoInputState {
  description: string;
}
interface ITodoInputProps {
  addTodo: (params: any) => void;
}
class TodoInput extends Component<ITodoInputProps, ITodoInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    };
  }
  enter = () => {
    this.props.addTodo({ description: this.state.description });
    this.setState({ description: '' });
  };
  render() {
    const { description } = this.state;
    const suffix = description ? <Icon type="enter" onClick={this.enter} /> : <span />;
    return (
      <div id="TodoInput">
        <Input
          placeholder="添加待办事项 . . ."
          suffix={suffix}
          value={description}
          onPressEnter={this.enter}
          onChange={(e) => this.setState({ description: e.target.value })}
        />
      </div>
    );
  }
}
export default TodoInput; 