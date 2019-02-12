export const SCAN_DEVICE = 'SCAN_DEVICE';
export const SAVE_DEVICES = 'SAVE_DEVICES';
export const ADD_DEVICE = 'ADD_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';

export const scanDevices = () => ({
  type: SCAN_DEVICE,
});

export const saveDevices = devices => ({
  type: SAVE_DEVICES,
  devices,
});

export const addDevice = newDevice => ({
  type: ADD_DEVICE,
  newDevice,
});

export const removeDevice = key => ({
  type: REMOVE_DEVICE,
  key,
});
