import {Action} from "../actions"
import {ActionTypes} from "../action-types";

const initialState = {
  cartProducts: {}
  // count: 0
};
const reducer = (state: any = initialState, action: Action) =>{

  // switch (action.type){
  //   case ActionTypes.ADD_CART_PRODUCT:
  //     let newCartProducts: any[] = []
  //     state.cartProducts.forEach((productArray:any, index:any)=>{
  //       if(productArray[0] === action.payload) {
  //         newCartProducts = state.cartProducts;
  //         newCartProducts[index] = [...productArray, action.payload];
  //          return false
  //       }
  //     })
  //     let result = newCartProducts.length ?  [...newCartProducts] : [...state.cartProducts, [action.payload]]
  //     return {
  //       ...state,
  //       cartProducts: result
  //     };
  switch (action.type){
    case ActionTypes.ADD_CART_PRODUCT:

      if(state.cartProducts[action.payload.id]){
        let newCartProducts: any = {};
        newCartProducts = state.cartProducts;
        newCartProducts[action.payload.id].count = ++newCartProducts[action.payload.id].count

        return{
          ...state,
          cartProducts:  {...newCartProducts},
          // count: ++state.count
        }
      }
      else{
        let newCartProduct: any = {};
        newCartProduct[action.payload.id] = {product: action.payload, count: 1}

        return{
          ...state,
          cartProducts:  {...state.cartProducts, ...newCartProduct},
          // count: ++state.count
        }
      }

    case ActionTypes.REMOVE_CART_PRODUCT:
      return state
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
