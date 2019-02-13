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

import TableToolBar from '../../components/settings/TableToolBar';
import {
  EditableCell,
  EditableFormRow,
  EditOperationCell,
} from '../../components/settings/EditableCell';
import './DeviceSettings.css';

let newDeviceKey = 20000;
// action: scan
// action: add device
class DeviceSettings extends React.Component {
  state = {
    modifyItems: {},
    editingkey: '',
  };

  isEditing = key => key === this.state.editingkey;

  save = (form, record) => {};

  setEditing = key => {
    this.setState({ editingkey: key });
  };

  addDefaultDevice = () => {
    const { addDevice } = this.props;

    addDevice({
      key: newDeviceKey.toString(10),
      ip: '172.0.0.1',
      name: 'Device Name',
      sensors: [],
    });
    newDeviceKey = newDeviceKey + 1;
  };

  columns = [
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      editable: true,
    },
    {
      title: '管理人員',
      key: 'management',
      render: (text, record) => <span>大蔡</span>,
      editable: false,
    },
    {
      title: '供應商',
      key: 'provider',
      render: (text, record) => <span>小蔡</span>,
      editable: false,
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      onCell: record => ({
        style: { paddingTop: 0, paddingBottom: 0 },
      }),
      render: (text, record) => {
        const editing = this.isEditing(record.key);

        return (
          <EditOperationCell
            editing={editing}
            handlerSave={this.save}
            handlerSetEditing={this.setEditing}
            record={record}
          />
        );
      },
    },
  ];

  render() {
    const { appState, data } = this.props;
    const columns = this.columns.map(item => {
      if (!item.editable) {
        return item;
      }
      return {
        ...item,
        onCell: record => ({
          record,
          editing: this.isEditing(record.key),
          title: item.title,
          dataIndex: item.dataIndex,
        }),
      };
    });

    return (
      <div>
        <TableToolBar
          editing={appState.tableEditing}
          addDevice={this.addDefaultDevice}
        />
        <Table
          columns={columns}
          dataSource={data.devices}
          components={{ body: { cell: EditableCell, row: EditableFormRow } }}
        />
      </div>
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
