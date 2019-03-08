import { SET_USERS } from '../actions';

const userReducer = (preState = [], action) => {
  switch (action.type) {
    case SET_USERS:
      const array = action.payload;
      if (Array.isArray(array)) {
        return action.payload.slice(0, action.payload.length);
      } else {
        return preState;
      }

    default:
      return preState;
  }
};

export default userReducer;
