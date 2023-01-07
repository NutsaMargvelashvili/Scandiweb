import {createStore, applyMiddleware, compose} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";


export const store = createStore(
  reducers,
  {},
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
)
