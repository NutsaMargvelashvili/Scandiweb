import {Action} from "../actions"
import {ActionTypes} from "../action-types";

const initialState = {
  cartProducts: [],
};
const reducer = (state: any = initialState, action: Action) =>{
   console.log(action, action.type, "actionnnnnnnnnn")
  switch (action.type){
    case ActionTypes.ADD_CART_PRODUCT:
      console.log(state, "stateeeeeee")
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload]
      };
    default:
      return state
  }
}

export default reducer;
