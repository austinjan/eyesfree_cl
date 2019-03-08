export const SET_USERS = 'SET_USERS';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const API_GET_ALL_USER = 'API_GET_ALL_USER';

export const apiGetAllUser = () => ({
  type: API_GET_ALL_USER,
});

export const setUsers = users => ({
  type: SET_USERS,
  payload: users,
});

export const removeUser = keys => ({
  type: REMOVE_USER,
  payload: keys,
});

export const updateUser = (key, newUser) => ({
  type: UPDATE_USER,
  payload: { key, newUser },
});
