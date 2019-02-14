export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const addUser = newUser => ({
  type: ADD_USER,
  newUser,
});

export const removeUser = key => ({
  type: REMOVE_USER,
  key,
});

export const updateUser = (key, newUser) => ({
  type: UPDATE_USER,
  key,
  newUser,
});
