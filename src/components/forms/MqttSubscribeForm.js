import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon, InputNumber, Modal, Table } from 'antd';
import * as _ from 'lodash';
import './normalFormStyle.css';

const uniqueKey = () => {
  return (
    'subscribe-' +
    Math.random()
      .toString(36)
      .substr(2, 16)
  );
};

const SubscribeModalForm = Form.create({
  name: 'form_in_modal',
})(props => {
  const { visible, onCancel, onCreate, form } = props;
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      title="Subscribe setting"
      okText="Subscribe"
      onCancel={onCancel}
      onOk={() => {
        onCreate(form);
      }}
    >
      <Form layout="inline">
        <Form.Item label="Title">
          {getFieldDecorator('Topic', {})(<Input placeholder="mqtt topic" />)}
        </Form.Item>
        <Form.Item label="Qos">
          {getFieldDecorator('Qos')(<InputNumber min={0} max={3} />)}
        </Form.Item>
      </Form>
    </Modal>
  );
});

// 處理 subscribe topic input，和 MqttBrokerForm 一起使用
const mqttSubscribForm = props => {
  const { subscribes, handleRemoveSubscribe, handleAddSubscribe } = props;
  const [showForm, setShowForm] = useState(false);

  const add = () => {
    setShowForm(true);
  };

  const handleSubscibeOk = form => {
    setShowForm(false);

    form.validateFields((err, values) => {
      if (err) return;
      console.log('mqtt subscribe form:', values);
      handleAddSubscribe({ key: uniqueKey(), ...values });
    });
  };

  const handleCancle = () => {
    setShowForm(false);
  };

  const columns = [
    {
      title: 'Topic',
      dataIndex: 'Topic',
      key: 'Topic',
    },
    {
      title: 'Qos',
      dataIndex: 'Qos',
      key: 'Qos',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleRemoveSubscribe(record.key)}>
          Unsubscribe
        </Button>
      ),
    },
  ];

  return (
    <div className="form-container">
      <h3 className="form-row">Subscribe topics</h3>
      <Button
        type="default"
        onClick={add}
        style={{ width: '60%', margin: ' 5px 0px' }}
      >
        <Icon type="plus" /> Add subscribe
      </Button>
      <Table columns={columns} dataSource={subscribes} size="small" />

      <SubscribeModalForm
        visible={showForm}
        onCancel={handleCancle}
        onCreate={handleSubscibeOk}
      />
    </div>
  );
};

mqttSubscribForm.propTypes = {
  handleRemoveSubscrib: PropTypes.func,
  handleAddSubscrib: PropTypes.func,
  subscribes: PropTypes.array.isRequired,
};

mqttSubscribForm.defaultProps = {
  handleRemoveSubscrib: () => {},
  handleAddSubscrib: () => {},
};

export default mqttSubscribForm;
