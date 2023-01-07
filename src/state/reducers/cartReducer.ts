import {Action} from "../actions"
import {ActionTypes} from "../action-types";

const initialState = {
  cartProducts: []
};
const reducer = (state: any = initialState, action: Action) =>{

  switch (action.type){
    case ActionTypes.ADD_CART_PRODUCT:
      let newCartProducts: any[] = []
      state.cartProducts.forEach((productArray:any, index:any)=>{
        if(productArray[0] === action.payload) {
          newCartProducts = state.cartProducts;
          newCartProducts[index] = [...productArray, action.payload];
           return false
        }
      })
      let result = newCartProducts.length ?  [...newCartProducts] : [...state.cartProducts, [action.payload]]
      return {
        ...state,
        cartProducts: result
      };
    // case ActionTypes.PRODUCTS_AMOUNT:
    //   let counts: any = [];
    //   state.cartProducts.forEach((x:any)=>{
    //     counts[x] = (counts[x] || 0) + 1;
    //   })
    //   return state
    default:
      return state
  }
}

export default reducer;
