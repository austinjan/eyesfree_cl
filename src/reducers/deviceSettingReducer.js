import {
  SCAN_DEVICE,
  ADD_DEVICE,
  REMOVE_DEVICES,
  UPDATE_DEVICE,
} from '../actions/deviceActions';

const DataSize = {
  bit: 1,
  byte: 8,
  word: 16,
  dword: 32,
};

const DataFormat = {
  bit: 'bit',
};

const initialState = {
  devices: [
    {
      key: '10000',
      ip: '192.168.1.1',
      name: 'IOT-Gateway',
      sensors: [
        {
          id: 1,
          name: 'Input01',
          dataSize: DataSize.bit,
          mqttBroker: 'mqtt://127.0.0.1',
          topic: 'input/1',
          format: {
            prefix: '',
            postfix: ' ',
          },
        },
        {
          id: 2,
          name: 'AI01',
          dataSize: DataSize.word,
          mqttBroker: 'mqtt://127.0.0.1',
          topic: 'ai/1',
          format: {
            prefix: '',
            postfix: ' ',
          },
        },
      ],
    },
  ],
};

const deviceSettingReducer = (preState = initialState, action) => {
  switch (action.type) {
    case ADD_DEVICE:
      const { devices } = preState;
      devices.push(action.newDevice);
      return Object.assign({}, preState, { devices });

    case SCAN_DEVICE:
      return preState;

    case REMOVE_DEVICES:
      if (!action.keys) {
        return preState;
      }
      const newDevcies = preState.devices.filter(
        item => !action.keys.includes(item.key)
      );

      return Object.assign({}, preState, { devices: newDevcies });

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

export default deviceSettingReducer;
