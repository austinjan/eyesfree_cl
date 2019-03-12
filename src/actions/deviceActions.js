export const SCAN_DEVICE = 'SCAN_DEVICE';
export const API_ADD_DEVICE = 'API_ADD_DEVICE';
export const FETCH_REMOVE_DEVICES = 'API_REMOVE_DEVICES';
export const UPDATE_DEVICE = 'UPDATE_DEVICE';
export const FETCH_UPDATE_DEVICE = 'API_UPDATE_DEVICE';
export const SET_DEVICES = 'SET_DEVICES';
export const INIT_DEVICES = 'INIT_DEVICES';

export const setDevices = payload => ({
  type: SET_DEVICES,
  payload,
});

export const scanDevices = () => ({
  type: SCAN_DEVICE,
});

// process by saga.js
export const fetchAddDevice = newDevice => ({
  type: API_ADD_DEVICE,
  payload: newDevice,
});

export const fetchRemoveDevices = keys => ({
  type: FETCH_REMOVE_DEVICES,
  keys,
});

export const apiUpdateDevice = (key, newItem) => ({
  type: FETCH_UPDATE_DEVICE,
  key,
  newItem,
});
export const updateDevice = (key, newItem) => ({
  type: UPDATE_DEVICE,
  key,
  newItem,
});

export const initDevices = () => ({
  type: 'INIT_DEVICES',
});
