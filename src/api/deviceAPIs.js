import { apiCreate, apiUpdate, apiRemove } from './crudAPIs';

export const apiGetDevices = async () => {
  const response = await fetch('/api/getall/devices');
  if (!response.ok) {
    console.log('ERRRRor!!!! get /api/getall/devices');
    throw Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

export const apiAddDevice = async newDevice => {
  const ret = await apiCreate(newDevice, 'devices');
  return ret;
};

export const apiUpdateDevice = async (key, newItem) => {
  apiUpdate(key, newItem, 'devices');
};

export const apiRemoveDevice = async keys => {
  const ret = await apiRemove(keys, 'devices');
  return ret;
};

export const apiScanDevice = async () => {
  const response = await fetch(`/api/devices/scan`);
  if (!response.ok) {
    throw Error(response.statusText);
  }
};
