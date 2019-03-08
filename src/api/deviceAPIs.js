export const apiGetDevices = async () => {
  try {
    const response = await fetch('/api/getall/devices');

    const data = await response.json();
    console.log('getDevice %o', data);
    return data;
  } catch (err) {
    console.log('ERRRRRRRR');
    console.log(err);
  }
};

export const apiAddDevice = async newDevice => {
  try {
    const response = await fetch('/api/devices/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDevice),
    });
    console.log('POST add device response', response);
  } catch (err) {
    console.log('ERRRRRRRRERERRRR');
  }
};

export const apiUpdateDevice = async (key, newDevice) => {
  try {
    const response = await fetch('/api/devices/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, newDevice }),
    });
    console.log('POST update device response', response);
  } catch (err) {
    console.log('ERRRRRRRRERERRRR');
  }
};

export const apiRemoveDevice = async keys => {
  try {
    const url = '/api/devices/delete';
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(keys),
    });
    console.log('DEL request device response', response);
  } catch (err) {
    console.log('ERRRRRRRRERERRRR');
  }
};
