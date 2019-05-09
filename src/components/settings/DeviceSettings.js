import React from 'react';
import { connect } from 'react-redux';

import {
  fetchAddDevice,
  apiUpdateDevice,
  fetchRemoveDevices,
} from '../../actions';

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
  addDevice: newDevice => dispatch(fetchAddDevice(newDevice)),
  updateDevice: (key, newDevice) => dispatch(apiUpdateDevice(key, newDevice)),
  removeDevices: keys => dispatch(fetchRemoveDevices(keys)),
});
export default connect(
  mapStateProps,
  mapDispatchToProps
)(DeviceSettings);
