import React from 'react';
import { Table } from 'antd';
import TableToolBar from './TableToolBar';
import {
  EditableCell,
  EditableFormRow,
  EditOperationCell,
} from './EditableCell';
import { apiScanDevice } from '../../api';
import './tableStyle.css';
import ConnectSensorTable from './SensorTable';

let uniqueKey = function() {
  return (
    'dev-' +
    Math.random()
      .toString(36)
      .substr(2, 16)
  );
};

class DevicesTable extends React.Component {
  state = {
    modifyItems: {},
    editingkey: '',
    selectedRowKeys: [],
    scaning: false,
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
      key: uniqueKey(),
      ip: '172.0.0.1',
      name: 'Device Name',
      sensors: [],
    });
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
    this.setState({ selectedRowKeys });
  };

  handleSensorChanged = (sensors, key) => {};

  scanDevices = () => {
    try {
      apiScanDevice();
    } catch (err) {
      console.log('handleSensorChanged err: ', err);
    }
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
          handlers={{
            addItem: this.addDefaultDevice,
            removeSelectedItems: this.removeSelectedDevcies,
            scanDevices: this.scanDevices,
          }}
          componentsText={{
            add: '新增裝置',
            remove: '移除選取裝置',
            scan: '掃描網域裝置',
          }}
        />

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data.devices}
          components={{ body: { cell: EditableCell, row: EditableFormRow } }}
          expandedRowRender={(record, idex, indent, expaned) => (
            <ConnectSensorTable
              sensors={record.sensors}
              recordKey={record.key}
            />
          )}
        />
      </div>
    );
  }
}

export default DevicesTable;
