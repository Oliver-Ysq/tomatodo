import { ADD_TODO, INIT_TODOS, UPDATE_TODO, EDIT_TODO } from '../actionTypes';


interface Action {
  type: string;
  payload: any;
}
export default (state: any[] = [], action: Action): any => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case INIT_TODOS:
      return [...action.payload];
    case UPDATE_TODO:
      return state.map((item: any) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    case EDIT_TODO:
      return state.map((item: any) => {
        if (item.id === action.payload) {
          return Object.assign({}, item, { editing: true });
        } else {
          return Object.assign({}, item, { editing: false });
        }
      });
    default:
      return state;
  }
};