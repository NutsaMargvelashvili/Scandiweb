import {ActionTypes} from "../action-types";
import { Dispatch} from "redux";
import {Action} from "../actions";

export const addCartProduct = (product: {}) => {
  console.log("cmnnn", product);
  return (dispatch: Dispatch<Action>) =>{
    dispatch({
      type: ActionTypes.ADD_CART_PRODUCT,
      payload: product
    })
  }
}
