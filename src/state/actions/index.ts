import {ActionTypes} from "../action-types";

interface AddCartProductAction {
  type: ActionTypes.ADD_CART_PRODUCT,
  payload: any
}
// interface CountProductsAmountAction {
//   type: ActionTypes.PRODUCTS_AMOUNT,
// }
interface RemoveCartProductAction {
  type: ActionTypes.REMOVE_CART_PRODUCT,
  payload: any
}

export type Action = AddCartProductAction | RemoveCartProductAction;
