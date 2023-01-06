import {ActionTypes} from "../action-types";

interface AddCartProductAction {
  type: ActionTypes.ADD_CART_PRODUCT,
  payload: {}
}

export type Action = AddCartProductAction;
