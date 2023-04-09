import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

const composeEnhancers = compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducer, enhancer);

export default store;
