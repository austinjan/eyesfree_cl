import React from 'react';
import { Table } from 'antd';
import TableToolBar from '../../components/settings/TableToolBar';
import {
  EditableCell,
  EditableFormRow,
  EditOperationCell,
} from '../../components/settings/EditableCell';
import './DeviceSettings.css';

let newDeviceKey = 20000;

class DevicesTable extends React.Component {
  state = {
    modifyItems: {},
    editingkey: '',
    selectedRowKeys: [],
  };

  isEditing = key => key === this.state.editingkey;

  save = (form, key) => {
    const { updateDevice } = this.props;

    form.validateFields((err, row) => {
      if (err) {
        return;
      }

      this.setState({ editingkey: '' });
      updateDevice(key, row);
    });
  };

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

  removeSelectedDevcies = () => {
    const { removeDevices } = this.props;
    const { selectedRowKeys } = this.state;
    removeDevices(selectedRowKeys);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selected changed %0', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { data } = this.props;
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

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
          addDevice={this.addDefaultDevice}
          removeSelectedDevices={this.removeSelectedDevcies}
        />
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data.devices}
          components={{ body: { cell: EditableCell, row: EditableFormRow } }}
        />
      </div>
    );
  }
}

export default DevicesTable;
