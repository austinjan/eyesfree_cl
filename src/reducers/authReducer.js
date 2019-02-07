import { AUTHENTICATED, SET_USER_ACCOUNT } from '../actions';

const initialState = {
  user: null,
  authenticated: null,
};
const authReducer = (preState = initialState, action) => {
  switch (action) {
    case AUTHENTICATED:
      return Object.assign({}, preState, { authenticated: true });
    case SET_USER_ACCOUNT:
      const account = action.data || null;
      return Object.assign({}, preState, { account });
    default:
      return initialState;
  }
};

export default authReducer;
