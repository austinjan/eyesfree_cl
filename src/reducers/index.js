import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';

const initialState = {
  // init state object
  user: {
    account: null,
    password: null,
    authenticated: false,
  },
};

export const rootReducer = combineReducers({
  // state object: reducer function
  user: authReducer,
  form: formReducer,
});
