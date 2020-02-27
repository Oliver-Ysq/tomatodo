import React, { Component } from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import './todos.scss';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions';

interface ITodosState {
  todos: any;
}

class Todos extends Component<any, ITodosState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: []
    };
  }
  get unDeletedTodos() {
    return this.state.todos.filter((item: any) => !item.deleted);
  }
  get unCompletedTodos() {
    return this.unDeletedTodos.filter((item: any) => !item.completed);
  }
  get completedTodos() {
    return this.unDeletedTodos.filter((item: any) => item.completed);
  }

  addTodo = async (params: any) => {
    const { todos } = this.state;
    try {
      const response = await axios.post('todos', params);
      this.setState({ todos: [response.data.resource, ...todos] });
    } catch (e) {
      throw new Error(e);
    }
  };

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map((item: any) => Object.assign({}, item, { editing: false }));
      this.setState({ todos });
    } catch (e) {
      throw new Error(e);
    }
  };

  updateTodo = async (id: number, params: any) => {
    const { todos } = this.state;
    try {
      const response = await axios.put(`todos/${id}`, params);
      const newTodos = todos.map((item: any) => {
        if (id === item.id) {
          return response.data.resource;
        } else {
          return item;
        }
      });
      this.setState({ todos: newTodos });
    } catch (e) {
      throw new Error(e);
    }
  };

  componentDidMount() {
    this.getTodos();
  }

  toEditing = (id: number) => {
    const { todos } = this.state;
    const newTodos = todos.map((item: any) => {
      if (id === item.id) {
        return Object.assign({}, item, { editing: true });
      } else {
        return Object.assign({}, item, { editing: false });
      }
    });
    this.setState({ todos: newTodos });
  };

  public render() {
    return (
      <div id="Todos">
        <TodoInput />
        <div className="todoList">
          {this.unCompletedTodos.map((item: any) => {
            return (
              <TodoItem
                key={item.id} {...item}
                update={this.updateTodo}
                toEditing={this.toEditing}
              />
            );
          })
          }
          {this.completedTodos.map((item: any) => {
            return (
              <TodoItem
                key={item.id} {...item}
                update={this.updateTodo}
                toEditing={this.toEditing}
              />
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
  addTodo
};


export default connect(mapStateToProps, mapDispatchToProps)(Todos);