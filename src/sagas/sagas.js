import { put, call, takeEvery, all } from 'redux-saga/effects';
import { getDevices } from './api.js';
import { SET_DEVICES } from '../actions/deviceActions';

export function* getDevicesSaga() {
  const devices = yield call(getDevices);
  yield put({ type: SET_DEVICES, payload: devices });
}

export function* watchInitDevices() {
  yield console.log('Saga ganerator function watchInitDevices ....');
  yield takeEvery('INIT_DEVICES', getDevicesSaga);
}

export default function* rootSaga() {
  yield all([watchInitDevices()]);
}
