import { FETCH_FAIL } from '../actions';

const initialState = {
  lastError: '',
};
const errorReducer = (preState = initialState, action) => {
  switch (action.type) {
    case FETCH_FAIL:
      return Object.assign({}, preState, { authenticated: true });
    default:
      return initialState;
  }
};

export default errorReducer;
