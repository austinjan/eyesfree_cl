import { SET_USERS, UPDATE_USER } from '../actions';

const userReducer = (preState = [], action) => {
  switch (action.type) {
    case SET_USERS:
      const array = action.payload;
      if (Array.isArray(array)) {
        return action.payload.slice(0, action.payload.length);
      } else {
        return preState;
      }

    case UPDATE_USER:
      const copyUsers = [...preState];
      const index = copyUsers.findIndex(
        item => action.payload.key === item.key
      );
      if (index > -1) {
        const preItem = copyUsers[index];
        const newItem = Object.assign({}, preItem, action.payload.newItem);
        copyUsers[index] = newItem;
        return copyUsers;
      }
      break;
    default:
      return preState;
  }
};

export default userReducer;
