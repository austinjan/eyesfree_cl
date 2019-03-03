import React from 'react';
import { Form, Input } from 'antd';

// sensors: [
//   {
//     id: 1,
//     key: 'DI01',
//     name: 'Input01',
//     dataSize: DataSize.bit,
//     mqttBroker: 'mqtt://127.0.0.1',
//     topic: 'input/1',
//     format: {
//       prefix: '',
//       postfix: ' ',
//     },
//   },
//   {
//     id: 2,
//     key: 'AI01',
//     name: 'AI01',
//     dataSize: DataSize.word,
//     mqttBroker: 'mqtt://127.0.0.1',
//     topic: 'ai/1',
//     format: {
//       prefix: '',
//       postfix: ' ',
//     },
//   },
// ],
const option = {
  name: 'sensor_form',
  onFieldsChange: (props, changedFields) => {
    props.handleFieldChanged(changedFields);
  },
  mapPropsToFields: props => {
    return {
      name: Form.createFormField({
        value: props.name,
      }),
      mqttBroker: Form.createFormField({
        value: props.mqttBroker,
      }),
      topic: Form.createFormField({
        value: props.topic,
      }),
    };
  },
};

// porps = { data: state.devcies.devcies.sensors[index],
//   handleFieldChanged: ()=>() }
const sensorForm = Form.create(option)(props => {
  const { getFieldDecorator } = props.form;
  const validIPAddress = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const validHostname = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]* [a-zA-Z0-9])\.)* ([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]* [A-Za-z0-9])$/;
  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="端點名稱">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '請輸入端點名稱！' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Mqtt Broker">
          {getFieldDecorator('mqttBroker', {
            rules: [
              {
                required: true,
                message: '請輸入broker網址或是主機站名！',
              },
              {
                required: true,
                message: '請輸入正確的網址！',
                pattern: validIPAddress,
              },
              {
                required: true,
                message: '請輸入正確的網址！',
                pattern: validHostname,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Mqtt Topic">
          {getFieldDecorator('topic', {
            rules: [{ required: true, message: '請輸入topic！' }],
          })(<Input />)}
        </Form.Item>
      </Form>
    </div>
  );
});

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  return errors;
};

export default sensorForm;
