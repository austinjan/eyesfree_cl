import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import TableToolBar from './TableToolBar';
import {
  EditableCell,
  EditableFormRow,
  EditOperationCell,
} from './EditableCell';
import './tableStyle.css';

let uniqueKey = function() {
  return (
    'user-' +
    Math.random()
      .toString(36)
      .substr(2, 16)
  );
};

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
    const { updateUser } = this.props;

    form.validateFields((err, row) => {
      if (err) {
        return;
      }

      this.setState({ editingkey: '' });
      updateUser(key, row);
    });
  };

  setEditing = key => {
    this.setState({ editingkey: key });
  };

  addDefaultUser = () => {
    const { addUser } = this.props;
    const key = uniqueKey();
    addUser({
      key: key,
      name: '輸入名稱',
      email: '請輸入電子郵件',
      password: '請輸入密碼',
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

  removeSelectedUsers = () => {
    const { removeUsers } = this.props;
    const { selectedRowKeys } = this.state;
    removeUsers(selectedRowKeys);
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleSensorChanged = (sensors, key) => {};

  render() {
    const { data, searchUser } = this.props;
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
            addItem: this.addDefaultUser,
            removeSelectedItems: this.removeSelectedUsers,
            onSearch: searchUser,
          }}
          componentsText={{
            add: '新增使用者',
            remove: '移除選取使用者',
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
