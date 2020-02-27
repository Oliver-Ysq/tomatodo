import React, { Component } from 'react';
import { Checkbox, Icon } from 'antd';
import './todoitem.scss';
import classNames from 'classnames';
interface ITodoItemProps {
  id: number;
  description: string;
  completed: boolean;
  update: (id: number, params: any) => void;
  editing: boolean;
  toEditing: (id: number) => void;
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
  update = (params: any) => {
    this.props.update(this.props.id, params);
  };

  toEditing = () => {
    this.props.toEditing(this.props.id);
  };
  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.update({ description: this.state.editText });
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
          <Icon type="delete" onClick={e => this.update({ deleted: true })} />
        </div>
      </div>
    );
    const text = <span className="text" onDoubleClick={this.toEditing}>{this.props.description}</span>;
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
          onChange={e => this.update({ completed: e.target.checked })}
        />
        {
          this.props.editing ? editing : text
        }
      </div >
    );
  }
}
export default TodoItem;