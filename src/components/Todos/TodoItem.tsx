import React, { Component } from 'react';
import { Checkbox, Icon } from 'antd';
import './todoitem.scss';
import axios from '../../config/axios';
import classNames from 'classnames';
import { editTodo, updateTodo } from '../../redux/actions';
import { connect } from 'react-redux';

interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  editing: boolean;
  editTodo: (id: number) => any;
  updateTodo: (payload: any) => any;
}
interface ITodoItemState {
  editText: string;
}


class TodoItem extends Component<ITodoItemProps, ITodoItemState> {
  constructor(props: any) {
    super(props);
    this.state = {
      editText: this.props.description
    };
  }

  updateTodo = async (params: any) => {
    try {
      const response = await axios.put(`todos/${this.props.id}`, params);
      this.props.updateTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  editTodo = () => {
    this.props.editTodo(this.props.id);
  };

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.updateTodo({ description: this.state.editText });
    }
  };

  render() {
    const editing = (
      <div className="editing">
        <input
          type="text"
          value={this.state.editText}
          onChange={e => this.setState({ editText: e.target.value })}
          onKeyUp={this.onKeyUp}
        />
        <div className="iconWrapper">
          <Icon type="enter" />
          <Icon type="delete" onClick={e => this.updateTodo({ deleted: true })} />
        </div>
      </div>
    );
    const text = <span className="text" onDoubleClick={this.editTodo}>{this.props.description}</span>;
    const todoItemClass = classNames({
      TodoItem: true,
      editing: this.props.editing,
      completed: this.props.completed
    });

    return (
      < div id="TodoItem" className={todoItemClass}>
        <Checkbox
          style={{ marginRight: 8 }}
          checked={this.props.completed}
          onChange={e => this.updateTodo({ completed: e.target.checked })}
        />
        {
          this.props.editing ? editing : text
        }
      </div >
    );
  }
}
const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});
const mapDispatchToProps = {
  editTodo, updateTodo
};


export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);