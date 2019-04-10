import React from 'react';

import { Form, Input, InputNumber } from 'antd';
import './normalFormStyle.css';

const mqttBrokerForm = props => {
  const { form, brokerSettings } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    // console.log();
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <div className="form-row">
          <Form.Item label="Host" className="large-item">
            {getFieldDecorator('Host', {})(<Input />)}
          </Form.Item>
          <Form.Item label="Port" className="small-item">
            {getFieldDecorator('Port', {})(<Input />)}
          </Form.Item>
          <Form.Item label="ClientID" className="normal-item">
            {getFieldDecorator('ClientID', {})(<Input />)}
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item label="Username" className="normal-item">
            {getFieldDecorator('Username', {})(<Input />)}
          </Form.Item>
          <Form.Item label="Password" className="normal-item">
            {getFieldDecorator('Password', {})(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Keep Alive" className="normal-item">
            {getFieldDecorator('KeepAlive', {})(
              <InputNumber min={10} max={360} />
            )}
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

const mapProp2Field = value => {
  return Form.createFormField({ value: value });
};

export default Form.create({
  name: 'mqtt-broker-form',
  onFieldsChange(props, changedFields) {
    props.onFieldChanged(changedFields);
  },
  mapPropsToFields(props) {
    const retObj = {};
    const { formSettings } = props;
    Object.keys(formSettings).map(
      key => (retObj[key] = mapProp2Field(formSettings[key]))
    );
    return retObj;
  },
  onValuesChange(_, changedValues, allValues) {
    //console.log(changedValues, allValues);
  },
})(mqttBrokerForm);
