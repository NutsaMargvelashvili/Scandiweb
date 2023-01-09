import {Action} from "../actions"
import {ActionTypes} from "../action-types";

const initialState = {
  currency: {symbol: "", label: ""},
  category: ""
};
const reducer = (state: any = initialState, action: Action) =>{

  switch (action.type){

    case ActionTypes.SELECT_CURRENCY:
      return{
        ...state,
        currency:  action.payload,
      }
    case ActionTypes.SELECT_CATEGORY:
      return{
        ...state,
        category:  action.payload,
      }
    default:
      return state
  }
}

export default reducer;
