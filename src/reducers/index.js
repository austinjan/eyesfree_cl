import { combineReducers } from "redux";

const initialState = {
  // init state object
  user: {
    account: null,
    password: null,
    successLogin: false
  }
};

export const rootReducer = combineReducers({
  // state object: reducer function
});
