import {
  SCAN_DEVICE,
  ADD_DEVICE,
  REMOVE_DEVICE,
  SAVE_DEVICES,
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
      key: 10000,
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
      console.log('deviceSettingReducer: add device');
      const { devices } = preState;
      devices.push(action.newDevice);
      return Object.assign({}, preState, { devices });

    case SCAN_DEVICE:
      console.log('deviceSettingReducer: scan@@@');
      return preState;

    case REMOVE_DEVICE:
      console.log('deviceSettingReducer: remove device');
      if (!action.key) {
        return preState;
      }
      const newDevcies = preState.devices.filter(
        item => item.key !== action.key
      );

      return Object.assign({}, preState, { devices: newDevcies });

    // remove device
    case SAVE_DEVICES:
      return Object.assign({}, preState, { devices: action.devices });
    // save devices
    default:
      return preState;
  }
};

export default deviceSettingReducer;
