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
interface countCartProductsPriceAction {
  type: ActionTypes.COUNT_CART_PRODUCTS_PRICE,
  payload: any
}

interface countCartProductsAction {
  type: ActionTypes.COUNT_CART_PRODUCTS,
  payload: any
}

interface selectCurrencyAction {
  type: ActionTypes.SELECT_CURRENCY,
  payload: any
}
interface selectCategoryAction {
  type: ActionTypes.SELECT_CATEGORY,
  payload: any
}
export type Action = AddCartProductAction | RemoveCartProductAction | countCartProductsPriceAction | countCartProductsAction | selectCurrencyAction | selectCategoryAction;
