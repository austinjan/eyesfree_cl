import React from 'react';
import { connect } from 'react-redux';
import UsersTable from './UsersTable';
import {
  getUsersFilter,
  fetchUpdatUser,
  fetchAddUser,
  fetchRemoveUsers,
} from '../../actions';

const userSettings = ({
  data,
  searchUser,
  updateUser,
  addUser,
  removeUsers,
}) => {
  return (
    <div>
      <UsersTable
        data={data}
        searchUser={searchUser}
        updateUser={updateUser}
        addUser={addUser}
        removeUsers={removeUsers}
      />
    </div>
  );
};

const mapStateProps = state => ({
  appState: state.appState,
  data: state.users,
});

const mapDispatchToProps = dispatch => ({
  searchUser: searchString => dispatch(getUsersFilter(searchString)),
  addUser: newUser => dispatch(fetchAddUser(newUser)),
  updateUser: (key, newDevice) => dispatch(fetchUpdatUser(key, newDevice)),
  removeUsers: keys => dispatch(fetchRemoveUsers(keys)),
});
export default connect(
  mapStateProps,
  mapDispatchToProps
)(userSettings);
