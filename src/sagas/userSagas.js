import { put, call, takeEvery } from 'redux-saga/effects';
import {
  apiGetAllUsers,
  apiFuzzySearchUsers,
  apiUpdateUser,
  apiAddUser,
  apiRemoveUsers,
} from '../api';

import {
  FETCH_ALL_USERS,
  FETCH_FILTERED_USERS,
  FETCH_UPDATE_USER,
  FETCH_ADD_USER,
  FETCH_REMOVE_USERS,
  setUsers,
  updateUser,
  fetchFail,
} from '../actions';

export function* searchUsersSaga(action) {
  const { filter } = action.payload;

  try {
    const data = yield call(apiFuzzySearchUsers, filter);
    console.log('saga searchUsers: response data= ', data);
    yield put(setUsers(data));
  } catch (err) {
    yield put(fetchFail(err));
  }
}

export function* addUserSaga(action) {
  const { newItem } = action.payload;

  try {
    const data = yield call(apiAddUser, newItem);
    console.log('saga searchUsers: response data= ', data);
    yield put(setUsers(data));
  } catch (err) {
    yield put(fetchFail(err));
  }
}

export function* updateUserSaga(action) {
  try {
    yield call(apiUpdateUser, action.payload.key, action.payload.newItem);
    yield put(updateUser(action.payload.key, action.payload.newItem));
  } catch (err) {
    yield put(fetchFail(err));
  }
}

export function* removeUsersSaga(action) {
  try {
    const users = yield call(apiRemoveUsers, action.payload);
    yield put(setUsers(users));
  } catch (err) {
    yield put(fetchFail(err));
  }
}

export function* getAllUsersSaga(action) {
  try {
    const users = yield call(apiGetAllUsers);
    yield put(setUsers(users));
  } catch (err) {
    yield put(fetchFail(err));
  }
}

export function* watchUsers() {
  yield takeEvery(FETCH_ALL_USERS, getAllUsersSaga);
  yield takeEvery(FETCH_FILTERED_USERS, searchUsersSaga);
  yield takeEvery(FETCH_ADD_USER, addUserSaga);
  yield takeEvery(FETCH_UPDATE_USER, updateUserSaga);
  yield takeEvery(FETCH_REMOVE_USERS, removeUsersSaga);
}
