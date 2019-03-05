import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  apiGetDevices,
  apiAddDevice,
  apiUpdateDevice,
  apiRemoveDevice,
} from './api.js';

import {
  SET_DEVICES,
  INIT_DEVICES,
  API_ADD_DEVICE,
  addDevice,
  updateDevice,
  removeDevices,
  API_UPDATE_DEVICE,
  API_REMOVE_DEVICES,
} from '../actions/deviceActions';

import { FETCH_FAIL } from '../actions';

export function* getDevicesSaga() {
  const devices = yield call(apiGetDevices);
  yield put({ type: SET_DEVICES, payload: devices });
}

export function* addDevicesSaga(action) {
  yield call(apiAddDevice, action.payload);
  yield put(addDevice(action.payload));
}

export function* updateDevicesSaga(action) {
  try {
    yield call(apiUpdateDevice, action.key, action.newItem);
  } catch (err) {
    yield put(FETCH_FAIL);
  }
  yield put(updateDevice(action.key, action.newItem));
}

export function* removeDevicesSaga(action) {
  try {
    yield call(apiRemoveDevice, action.keys);
  } catch (err) {
    yield put(FETCH_FAIL);
  }
  yield put(removeDevices(action.keys));
}

export function* watchDevices() {
  yield console.log('Saga ganerator function watchInitDevices ....');
  yield takeEvery(INIT_DEVICES, getDevicesSaga);
  yield takeEvery(API_ADD_DEVICE, addDevicesSaga);
  yield takeEvery(API_UPDATE_DEVICE, updateDevicesSaga);
  yield takeEvery(API_REMOVE_DEVICES, removeDevicesSaga);
}

export default function* rootSaga() {
  yield all([watchDevices()]);
}
