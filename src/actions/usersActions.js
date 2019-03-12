export const SET_USERS = 'SET_USERS';
export const REMOVE_USERS = 'REMOVE_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const FETCH_ALL_USERS = 'API_GET_ALL_USER';
export const FETCH_USERS_QUERY = 'API_GET_USERS_QUERY';
export const FETCH_FILTERED_USERS = 'API_GET_FILTERED_USERS';
export const FETCH_UPDATE_USER = 'FETCH_UPDATE_USER';
export const FETCH_ADD_USER = 'FETCH_ADD_USER';
export const FETCH_REMOVE_USERS = 'FETCH_REMOVE_USERS';

export const fetchAllUser = () => ({
  type: FETCH_ALL_USERS,
});

export const getUsersFilter = filterString => ({
  type: FETCH_FILTERED_USERS,
  payload: { filter: filterString },
});

export const fetchUsersByQuery = query => ({
  type: FETCH_USERS_QUERY,
  payload: { query },
});

export const setUsers = users => ({
  type: SET_USERS,
  payload: users,
});

export const fetchRemoveUsers = keys => ({
  type: FETCH_REMOVE_USERS,
  payload: keys,
});

export const removeUsers = keys => ({
  type: REMOVE_USERS,
  payload: keys,
});

export const fetchAddUser = newItem => ({
  type: FETCH_ADD_USER,
  payload: { newItem },
});

export const fetchUpdatUser = (key, newItem) => ({
  type: FETCH_UPDATE_USER,
  payload: { key, newItem },
});
export const updateUser = (key, newItem) => ({
  type: UPDATE_USER,
  payload: { key, newItem },
});
