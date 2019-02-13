import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import deviceSettingReducer from './deviceSettingReducer';
import appStateReducer from './appStateReducer';

const initialState = {
  // init state object
  user: {
    account: null,
    password: null,
    authenticated: false,
  },
  appSettings: {
    tableEditing: false,
  },
};

export const rootReducer = combineReducers({
  // state object: reducer function
  user: authReducer,
  form: formReducer,
  devices: deviceSettingReducer,
  appState: appStateReducer,
});
