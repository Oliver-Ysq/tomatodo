import React, { Component } from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import './todos.scss';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { initTodos, updateTodo } from '../../redux/actions';


class Todos extends Component<any> {
  // constructor(props: any) {
  //   super(props);
  // }
  get unDeletedTodos() {
    return this.props.todos.filter((item: any) => !item.deleted);
  }
  get unCompletedTodos() {
    return this.unDeletedTodos.filter((item: any) => !item.completed);
  }
  get completedTodos() {
    return this.unDeletedTodos.filter((item: any) => item.completed);
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map((item: any) => Object.assign({}, item, { editing: false }));
      this.props.initTodos(todos);
      // this.setState({ todos });
    } catch (e) {
      throw new Error(e);
    }
  };


  componentDidMount() {
    this.getTodos();
  }

  public render() {
    return (
      <div id="Todos">
        <TodoInput />
        <div className="todoList">
          {this.unCompletedTodos.map((item: any) => {
            return (
              <TodoItem key={item.id} {...item} />
            );
          })
          }
          {this.completedTodos.map((item: any) => {
            return (
              <TodoItem key={item.id} {...item} />
            );
          })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps
});
const mapDispatchToProps = {
  initTodos,
  updateTodo,
};


export default connect(mapStateToProps, mapDispatchToProps)(Todos);