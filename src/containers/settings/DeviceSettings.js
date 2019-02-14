import React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';

import {
  addDevice,
  updateDevice,
  scanDevices,
  removeDevices,
} from '../../actions/deviceActions';

import DevicesTable from './DevicesTable';

// action: scan
// action: add device
class DeviceSettings extends React.Component {
  render() {
    const { addDevice, updateDevice, removeDevices, data } = this.props;
    return (
      <DevicesTable
        addDevice={addDevice}
        updateDevice={updateDevice}
        removeDevices={removeDevices}
        data={data}
      />
    );
  }
}

const mapStateProps = state => ({
  appState: state.appState,
  data: state.devices,
});

const mapDispatchToProps = dispatch => ({
  addDevice: newDevice => dispatch(addDevice(newDevice)),
  updateDevice: (key, newDevice) => dispatch(updateDevice(key, newDevice)),
  removeDevices: keys => dispatch(removeDevices(keys)),
  scanDevice: () => dispatch(scanDevices),
});
export default connect(
  mapStateProps,
  mapDispatchToProps
)(DeviceSettings);
