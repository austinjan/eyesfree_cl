import {
  SCAN_DEVICE,
  UPDATE_DEVICE,
  SET_DEVICES,
} from '../actions/deviceActions';

// const DataSize = {
//   bit: 1,
//   byte: 8,
//   word: 16,
//   dword: 32,
// };

// const DataFormat = {
//   bit: 'bit',
// };

const devicesReducer = (preState = {}, action) => {
  switch (action.type) {
    case SET_DEVICES:
      return Object.assign({}, preState, { devices: action.payload });

    case SCAN_DEVICE:
      return preState;

    // case REMOVE_DEVICES:
    //   if (!action.keys) {
    //     return preState;
    //   }
    //   const newDevcies = preState.devices.filter(
    //     item => !action.keys.includes(item.key)
    //   );

    //   return Object.assign({}, preState, { devices: newDevcies });

    // remove device
    case UPDATE_DEVICE:
      const copyDevices = [...preState.devices];
      const index = copyDevices.findIndex(item => action.key === item.key);
      if (index > -1) {
        const preItem = copyDevices[index];
        const newItem = Object.assign({}, preItem, action.newItem);
        copyDevices[index] = newItem;
        return Object.assign({}, preState, { devices: copyDevices });
      }
      return preState;

    default:
      return preState;
  }
};

export default devicesReducer;
