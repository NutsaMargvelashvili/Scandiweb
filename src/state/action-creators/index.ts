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


// export const addCartProduct = (dispatch: any) => {
//   return (product: {}) => {
//     // this works because when the button is clicked,
//     // I can successfully console log in here.
//     console.log("cmnnn", product);
//     dispatch({
//       type: ActionTypes.ADD_CART_PRODUCT,
//       payload: product
//     }); // THIS DISPATCH IS NOT WORKING
//     // API call here...
//   }
// };
