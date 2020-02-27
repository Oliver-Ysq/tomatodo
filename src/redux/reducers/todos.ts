import { ADD_TODO } from '../actionTypes';


interface Action {
  type: string;
  payload: any;
}
export default (state = [], action: Action): any => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
};