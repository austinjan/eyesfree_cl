import { all } from 'redux-saga/effects';
import { watchDevices } from './deviceSagas';
import { watchUsers } from './userSagas';

export default function* rootSaga() {
  yield all([watchDevices(), watchUsers()]);
}
