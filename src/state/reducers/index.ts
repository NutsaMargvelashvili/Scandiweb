import {combineReducers} from "redux";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";

const reducers = combineReducers({
  cart: cartReducer,
  products: productsReducer
})

export default reducers

export type State = ReturnType<typeof reducers>
