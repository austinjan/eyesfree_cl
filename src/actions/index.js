export const AUTHENTICATED = 'AUTHENTICATED';
export const SET_USER_ACCOUNT = 'SET_USER_ACCOUNT';

export const authenticated = () => ({
  type: AUTHENTICATED,
});

export const setUserAccount = account => ({
  type: SET_USER_ACCOUNT,
  data: account,
});
