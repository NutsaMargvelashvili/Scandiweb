import {ActionTypes} from "../action-types";

interface AddCartProductAction {
  type: ActionTypes.ADD_CART_PRODUCT,
  payload: any
}
// interface CountProductsAmountAction {
//   type: ActionTypes.PRODUCTS_AMOUNT,
// }

export type Action = AddCartProductAction;
