import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import TableToolBar from '../../components/settings/TableToolBar';
import {
  EditableCell,
  EditableFormRow,
  EditOperationCell,
} from '../../components/settings/EditableCell';
import './tableStyle.css';

class UsersTable extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

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

  addDefaultUser = () => {
    const { addDevice } = this.props;

    addDevice({
      key: '',
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
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      editable: true,
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
            addItem: () => {},
            removeSelectedItems: this.removeSelectedDevcies,
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
          dataSource={data}
          components={{ body: { cell: EditableCell, row: EditableFormRow } }}
        />
      </div>
    );
  }
}

export default UsersTable;
