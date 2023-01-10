import {ActionTypes} from "../action-types";
import {Dispatch} from "redux";
import {Action} from "../actions";

export const addCartProduct = (product: {}) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ADD_CART_PRODUCT,
      payload: product
    })
  }
}
export const removeCartProduct = (product: {}) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.REMOVE_CART_PRODUCT,
      payload: product
    })
  }
}
export const countCartProductsPrice = (product: {}) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.COUNT_CART_PRODUCTS_PRICE,
      payload: product
    })
  }
}

export const countCartProducts = (product: {}) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.COUNT_CART_PRODUCTS,
      payload: product
    })
  }
}

export const selectCurrency = (product: {}) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.SELECT_CURRENCY,
      payload: product
    })
  }
}

export const selectCategory = (product: {}) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.SELECT_CATEGORY,
      payload: product
    })
  }
}
