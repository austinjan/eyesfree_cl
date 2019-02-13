import React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';

import {
  addDevice,
  updateDevice,
  scanDevices,
  removeDevice,
  saveDevices,
} from '../../actions/deviceActions';

import DevicesTable from './DevicesTable';

// action: scan
// action: add device
class DeviceSettings extends React.Component {
  render() {
    const { addDevice, updateDevice, data } = this.props;
    return (
      <DevicesTable
        addDevice={addDevice}
        updateDevice={updateDevice}
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
});
export default connect(
  mapStateProps,
  mapDispatchToProps
)(DeviceSettings);
