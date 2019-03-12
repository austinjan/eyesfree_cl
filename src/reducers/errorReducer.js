import { FETCH_FAIL } from '../actions';

const initialState = {
  lastError: '',
};

const getCurrentTime = () => {
  const currentdate = new Date();
  const datetime =
    currentdate.getFullYear() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getDate() +
    ' @ ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();
  return datetime;
};

const errorReducer = (preState = initialState, action) => {
  switch (action.type) {
    case FETCH_FAIL:
      const err = action.payload;
      const time = getCurrentTime();
      return Object.assign({}, preState, {
        lastError: err.msg,
        time: time,
      });
    default:
      return initialState;
  }
};

export default errorReducer;
