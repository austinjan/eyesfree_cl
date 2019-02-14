export const SCAN_DEVICE = 'SCAN_DEVICE';
export const ADD_DEVICE = 'ADD_DEVICE';
export const REMOVE_DEVICES = 'REMOVE_DEVICES';
export const UPDATE_DEVICE = 'UPDATE_DEVICE';

export const scanDevices = () => ({
  type: SCAN_DEVICE,
});

export const addDevice = newDevice => ({
  type: ADD_DEVICE,
  newDevice,
});

export const removeDevices = keys => ({
  type: REMOVE_DEVICES,
  keys,
});

export const updateDevice = (key, newItem) => ({
  type: UPDATE_DEVICE,
  key,
  newItem,
});
