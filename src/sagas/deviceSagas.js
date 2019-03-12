import { put, call, takeEvery } from 'redux-saga/effects';
import {
  apiGetDevices,
  apiAddDevice,
  apiUpdateDevice,
  apiRemoveDevice,
} from '../api';

import {
  SET_DEVICES,
  INIT_DEVICES,
  API_ADD_DEVICE,
  addDevice,
  updateDevice,
  removeDevices,
  FETCH_UPDATE_DEVICE,
  FETCH_REMOVE_DEVICES,
} from '../actions';

import { fetchFail } from '../actions';

export function* getDevicesSaga() {
  const devices = yield call(apiGetDevices);
  yield put({ type: SET_DEVICES, payload: devices });
}

export function* addDevicesSaga(action) {
  try {
    yield call(apiAddDevice, action.payload);
    yield put(addDevice(action.payload));
  } catch (err) {
    console.log(err);
    yield put(fetchFail(err));
  }
}

export function* updateDevicesSaga(action) {
  try {
    yield call(apiUpdateDevice, action.key, action.newItem);
    yield put(updateDevice(action.key, action.newItem));
  } catch (err) {
    yield put(fetchFail(err));
  }
}

export function* removeDevicesSaga(action) {
  try {
    const res = yield call(apiRemoveDevice, action.keys);
    console.log('function* removeDevicesSaga: ', res);
    yield put({ type: SET_DEVICES, payload: res });
  } catch (err) {
    yield put(fetchFail(err));
  }
  //yield put(removeDevices(action.keys));
}

export function* watchDevices() {
  yield console.log('Saga ganerator function watchInitDevices ....');
  yield takeEvery(INIT_DEVICES, getDevicesSaga);
  yield takeEvery(API_ADD_DEVICE, addDevicesSaga);
  yield takeEvery(FETCH_UPDATE_DEVICE, updateDevicesSaga);
  yield takeEvery(FETCH_REMOVE_DEVICES, removeDevicesSaga);
}
