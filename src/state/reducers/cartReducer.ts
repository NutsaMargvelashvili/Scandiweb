import {Action} from "../actions"
import {ActionTypes} from "../action-types";

const initialState = {
  cartProducts: [1],
};

const reducer = (state: any = initialState, action: Action) =>{

  switch (action.type){
    case ActionTypes.ADD_CART_PRODUCT:
      return state.cartProducts.push(action.payload);
    default:
      return state
  }
}

export default reducer;
