import React from 'react';
import { connect } from 'react-redux';
import UsersTable from './UsersTable';

const userSettings = ({ data }) => {
  return (
    <div>
      <UsersTable data={data} />
    </div>
  );
};

const mapStateProps = state => ({
  appState: state.appState,
  data: state.users,
});

const mapDispatchToProps = dispatch => ({
  // addDevice: newDevice => dispatch(apiAddDevice(newDevice)),
  // updateDevice: (key, newDevice) => dispatch(apiUpdateDevice(key, newDevice)),
  // removeDevices: keys => dispatch(apiRemoveDevices(keys)),
});
export default connect(
  mapStateProps,
  mapDispatchToProps
)(userSettings);
