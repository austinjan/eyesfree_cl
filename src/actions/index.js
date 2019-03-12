export const AUTHENTICATED = 'AUTHENTICATED';
export const SET_USER_ACCOUNT = 'SET_USER_ACCOUNT';
export const FETCH_FAIL = 'FETCH_FAIL';
export const FETCH_SUCCES = 'FETCH_SUCCES';
export * from './deviceActions';
export * from './usersActions';

export const fetchFail = msg => ({
  type: FETCH_FAIL,
  payload: msg,
});

export const fetchSuccess = msg => ({
  type: FETCH_SUCCES,
});

export const authenticated = () => ({
  type: AUTHENTICATED,
});

export const setUserAccount = account => ({
  type: SET_USER_ACCOUNT,
  data: account,
});
