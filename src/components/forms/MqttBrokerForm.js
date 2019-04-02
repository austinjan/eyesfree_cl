import React from 'react';

import { Form, Input, InputNumber } from 'antd';

const mqttBrokerForm = props => {
  const { form, brokerSettings } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    // console.log();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="Host">
        {getFieldDecorator('Host', {})(<Input />)}
      </Form.Item>
    </Form>
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
    Object.keys(props.gaugeSettings).map(
      key => (retObj[key] = mapProp2Field(props.formSettings[key]))
    );
    return retObj;
  },
  onValuesChange(_, changedValues, allValues) {
    //console.log(changedValues, allValues);
  },
})(mqttBrokerForm);
