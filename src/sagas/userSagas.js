import { put, call, takeEvery } from 'redux-saga/effects';
import { apiGetAllUsers } from '../api';

import { FETCH_FAIL, API_GET_ALL_USER, setUsers } from '../actions';

// export function* addDevicesSaga(action) {
//   yield call(apiAddDevice, action.payload);
//   yield put(addDevice(action.payload));
// }

// export function* updateDevicesSaga(action) {
//   try {
//     yield call(apiUpdateDevice, action.key, action.newItem);
//   } catch (err) {
//     yield put(FETCH_FAIL);
//   }
//   yield put(updateDevice(action.key, action.newItem));
// }

// export function* removeDevicesSaga(action) {
//   try {
//     yield call(apiRemoveDevice, action.keys);
//   } catch (err) {
//     yield put(FETCH_FAIL);
//   }
//   yield put(removeDevices(action.keys));
// }

export function* getAllUsers(action) {
  try {
    const users = yield call(apiGetAllUsers);
    yield put(setUsers(users));
  } catch (err) {
    yield put(FETCH_FAIL);
  }
}

export function* watchUsers() {
  yield takeEvery(API_GET_ALL_USER, getAllUsers);
  // yield takeEvery(API_ADD_DEVICE, addDevicesSaga);
  // yield takeEvery(API_UPDATE_DEVICE, updateDevicesSaga);
  // yield takeEvery(API_REMOVE_DEVICES, removeDevicesSaga);
}
