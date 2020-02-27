import React, { Component } from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import './todos.scss';

class Todos extends Component {

  addTodo = async (params: any) => {
    try {
      const response = await axios.post('todos', params);
      console.log(response.data);
    } catch (e) {
      throw new Error(e);
    }
  };

  public render() {
    return (
      <div id="Todos">
        <TodoInput addTodo={(params: any) => this.addTodo(params)} />
      </div>
    );
  }
}
export default Todos;