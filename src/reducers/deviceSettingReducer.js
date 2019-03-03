import {
  SCAN_DEVICE,
  ADD_DEVICE,
  REMOVE_DEVICES,
  UPDATE_DEVICE,
  SET_DEVICES,
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
          key: 'DI01',
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
          key: 'AI01',
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
    {
      key: '54:23:45:11',
      ip: '192.168.1.222',
      name: 'IOT-RemoteIO',
      sensors: [
        {
          id: 'ai01',
          key: 'ai01',
          name: 'AI-01',
          dataSize: DataSize.bit,
          mqttBroker: 'mqtt://127.0.2.1',
          topic: 'ai/01',
          format: {
            prefix: '',
            postfix: 'cm',
          },
        },
        {
          id: 'ai02',
          key: 'AI02',
          name: 'AI-02',
          dataSize: DataSize.word,
          mqttBroker: 'mqtt://127.0.2.2',
          topic: 'ai/02',
          format: {
            prefix: '',
            postfix: 'm]',
          },
        },
      ],
    },
  ],
};

const deviceSettingReducer = (preState = {}, action) => {
  switch (action.type) {
    case SET_DEVICES:
      console.log('deviceSettingReducer: SET_DEVICES');
      return Object.assign({}, preState, { ...action.payload });
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
