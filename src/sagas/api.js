export const getDevices = async () => {
  try {
    const response = await fetch('/api/devices');

    const data = await response.json();
    console.log('getDevice %o', data);
    return data;
  } catch (err) {
    console.log('ERRRRRRRR');
    console.log(err);
  }
};
