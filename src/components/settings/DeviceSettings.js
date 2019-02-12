import React from 'react';
import { Button, Form, Table, Input } from 'antd';
import { connect } from 'react-redux';
import {
  addDevice,
  scanDevices,
  removeDevice,
  saveDevices,
} from '../../actions/deviceActions';
import './DeviceSettings.css';

const editalbeCell = props => {
  const { form, editing, title, dataIndex, ...restProps } = props;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(dataIndex, {
            rules: [
              {
                required: true,
                massage: `請輸入 ${title}!`,
              },
            ],
          })(<Input />)}
        </Form.Item>
      ) : (
        restProps.children
      )}
    </td>
  );
};

class ControlBar extends React.Component {
  state = {
    editing: false,
  };

  editHandler = e => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  componentDidMount() {
    console.log(`ControlBar.componentDidMount - props: ${this.props}`);
  }

  render() {
    const { editing } = this.state;
    const { addDevice } = this.props;
    const newDevice = {
      key: 10001,
      ip: '192.168.1.2',
      name: 'IOT-Gateway-Atop',
      sensors: [
        {
          id: 1,
          name: 'Input01',
          dataSize: 1,
          mqttBroker: 'mqtt://127.0.0.1',
          topic: 'input/1',
          format: {
            prefix: '',
            postfix: ' ',
          },
        },
      ],
    };
    return (
      <div className="toolbar">
        <Button
          type="default"
          icon="plus"
          onClick={() => addDevice(newDevice)}
          style={{ margin: '5px' }}
        >
          Add
        </Button>
        <Button type="primary" icon="search" style={{ margin: '5px' }}>
          Scan
        </Button>
        <div className="edit-button">
          {editing ? (
            <>
              <Button
                type="primary"
                style={{ marginLeft: '5px', marginRight: '5px' }}
                onClick={this.editHandler}
              >
                Save
              </Button>
              <Button
                type="secondary"
                style={{ marginLeft: '5px', marginRight: '5px' }}
                onClick={this.editHandler}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button type="primary" icon="edit" onClick={this.editHandler}>
              Edit
            </Button>
          )}
        </div>
      </div>
    );
  }
}
// action: scan
// action: add device
const deviceSettings = ({ data, columns, addDevice }) => {
  return (
    <div>
      <ControlBar addDevice={addDevice} />
      <Table columns={columns} dataSource={data.devices} />
    </div>
  );
};

const mapStateProps = state => ({
  data: state.devices,
  columns: [
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '管理人員',
      key: 'management',
      render: (text, record) => <span>大蔡</span>,
    },
    {
      title: '供應商',
      key: 'provider',
      render: (text, record) => <span>小蔡</span>,
    },
  ],
});

const mapDispatchToProps = dispatch => ({
  addDevice: newDevice => dispatch(addDevice(newDevice)),
});
export default connect(
  mapStateProps,
  mapDispatchToProps
)(deviceSettings);
