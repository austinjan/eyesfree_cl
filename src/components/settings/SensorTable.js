/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import SensorForm from '../forms/SensorForm';
import each from 'lodash/each';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import { Table, Modal } from 'antd';
import { connect } from 'react-redux';
import { updateDevice } from '../../actions/deviceActions';

const SensorDialog = ({
  visible,
  sensors,
  cancelEditing,
  handleFormDataChanged,
  saveEditing,
  editingKey,
}) => {
  const sensor = find(sensors, { key: editingKey });
  return (
    <Modal
      visible={visible}
      title="設定 Sensor 內容"
      onCancel={cancelEditing}
      onOk={saveEditing}
    >
      <SensorForm {...sensor} handleFieldChanged={handleFormDataChanged} />
    </Modal>
  );
};

class SensorTable extends React.Component {
  constructor(props) {
    super(props);
    this.willWriteToStore = null;
  }

  state = {
    editingKey: '',
  };
  isEditing = key => key === this.state.editingkey;

  componentDidMount() {
    this.setState({ sensors: { ...this.props.sensors } });
  }

  save = () => {
    // redux action: updateDevice
    const { updateDevice, recordKey } = this.props;

    updateDevice(recordKey, this.willWriteToStore);
    this.willWriteToStore = null;
    this.setState({ editingKey: '' });
  };

  // changedFields = {name: {name:"name", value:"newName"}}
  // record={key:'1000', ip:'xxx.xxx.xxx.xxx' sensors:[{...}]}
  handleFieldChanged = changedFields => {
    const { sensors, recordKey, data } = this.props;
    const { editingKey } = this.state;

    const newobj = {};
    each(changedFields, (value, key) => {
      Object.assign(newobj, { [value.name]: value.value });
    });
    const editingSensorIndex = findIndex(sensors, {
      key: editingKey,
    });
    if (editingSensorIndex < 0) {
      return;
    }

    const device =
      this.willWriteToStore ||
      cloneDeep(find(data.devices, { key: recordKey }));

    let sensor = device.sensors[editingSensorIndex];

    sensor = { ...sensor, ...newobj };

    device.sensors[editingSensorIndex] = sensor;
    this.willWriteToStore = device;
  };

  cancelEditing = () => {
    this.willWriteToStore = null;
    this.setState({ editingKey: '' });
  };

  setEditing = key => {
    console.log('SensorTable set editing: key: %s', key);
    this.setState({ editingKey: key });
  };

  columns = [
    {
      title: '名稱',
      dataIndex: 'name',
    },
    {
      title: '資料型態',
      dataIndex: 'dataSize',
    },
    {
      title: 'Mqtt Broker',
      dataIndex: 'mqttBroker',
    },
    {
      title: 'Mqtt Topic',
      dataIndex: 'topic',
    },
    {
      title: '單位',
      dataIndex: 'format.postfix',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      onCell: record => ({
        style: { paddingTop: 0, paddingBottom: 0 },
      }),
      render: (text, record) => {
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a href="javascript:;" onClick={() => this.setEditing(record.key)}>
            編輯
          </a>
        );
      },
    },
  ];
  render() {
    const { editingKey } = this.state;
    const { sensors } = this.props;

    return (
      <div>
        <SensorDialog
          visible={editingKey !== ''}
          cancelEditing={this.cancelEditing}
          handleFormDataChanged={this.handleFieldChanged}
          saveEditing={this.save}
          sensors={sensors}
          editingKey={editingKey}
        />
        <Table columns={this.columns} dataSource={sensors} />
      </div>
    );
  }
}
const mapStateProps = state => ({
  data: state.devices,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: (key, newDevice) => dispatch(updateDevice(key, newDevice)),
});

const ConnectSensorTable = connect(
  mapStateProps,
  mapDispatchToProps
)(SensorTable);

ConnectSensorTable.propTypes = {
  recordKey: PropTypes.string.isRequired,
  sensors: PropTypes.array.isRequired,
};

export default ConnectSensorTable;
