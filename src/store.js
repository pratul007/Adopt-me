import { createStore } from "redux";
import reducer from './reducer/index';

const store = createStore(
    store,
    typeof window === "object" && typeof Windows.__REDUX_DEVTOOLS_EXTESION__ !== "undefined" ? Windows.__REDUX_DEVTOOLS_EXTESION__() : (f) => f

);

export default store;
