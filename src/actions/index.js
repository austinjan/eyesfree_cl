export const AUTHENTICATED = 'AUTHENTICATED';
export const SET_USER_ACCOUNT = 'SET_USER_ACCOUNT';
export const FETCH_FAIL = 'FETCH_FAIL';
export * from './deviceActions';
export * from './usersActions';

export const fetchFail = () => ({
  type: FETCH_FAIL,
});

export const authenticated = () => ({
  type: AUTHENTICATED,
});

export const setUserAccount = account => ({
  type: SET_USER_ACCOUNT,
  data: account,
});
