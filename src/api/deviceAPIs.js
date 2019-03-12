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
  apiCreate(newDevice, 'devices');
};

export const apiUpdateDevice = async (key, newItem) => {
  apiUpdate(key, newItem, 'devices');
};

export const apiRemoveDevice = async keys => {
  const ret = await apiRemove(keys, 'devices');
  return ret;
  // try {
  //   const url = '/api/devices/delete';
  //   const response = await fetch(url, {
  //     method: 'DELETE',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(keys),
  //   });
  //   console.log('DEL request device response', response);
  // } catch (err) {
  //   console.log('ERRRRRRRRERERRRR');
  // }
};
