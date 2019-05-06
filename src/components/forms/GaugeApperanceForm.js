import React, { useState } from 'react';
import { Form, InputNumber, Radio, Slider, Input, Button } from 'antd';
import * as _ from 'lodash';
const mapProp2Field = value => {
  return Form.createFormField({ value: value });
};

const gaugeForm = props => {
  const { form, gaugeSettings } = props;
  const { getFieldDecorator } = form;
  const [formLayout, setFormLayout] = useState('horizontal');
  const requireRules = { required: true, message: 'Need value!' };
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 10 },
          wrapperCol: { span: 14 },
          style: { margin: '0px 5px 5px 5px' },
        }
      : null;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onFieldChanged(values);
        console.log('Received values of form: ', values);
      }
    });
  };

  return (
    <div>
      <Form layout={formLayout} onSubmit={handleSubmit}>
        <Form.Item label="Form Layout" {...formItemLayout}>
          <Radio.Group
            defaultValue="horizontal"
            onChange={e => setFormLayout(e.target.value)}
          >
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="height" {...formItemLayout}>
          {getFieldDecorator('height', {})(<InputNumber min={100} max={500} />)}
        </Form.Item>

        <Form.Item label="min" {...formItemLayout}>
          {getFieldDecorator('scale.gaugeValue.min', requireRules)(
            <InputNumber />
          )}
        </Form.Item>
        <Form.Item label="max" {...formItemLayout}>
          {getFieldDecorator('scale.gaugeValue.max', requireRules)(
            <InputNumber />
          )}
        </Form.Item>

        <Form.Item label="value :" {...formItemLayout}>
          {getFieldDecorator('data[0].value', {})(
            <Slider
              min={gaugeSettings.scale.gaugeValue.min}
              max={gaugeSettings.scale.gaugeValue.max}
            />
          )}
        </Form.Item>

        <Form.Item label="Color" {...formItemLayout}>
          {getFieldDecorator('apperarance.color', requireRules)(
            <input type="color" />
          )}
        </Form.Item>
        <Form.Item label="Background Color" {...formItemLayout}>
          {getFieldDecorator('apperarance.backgroundColor', requireRules)(
            <input type="color" />
          )}
        </Form.Item>

        <Form.Item label="Text " {...formItemLayout}>
          {getFieldDecorator('currentValueText', {})(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};


export default Form.create({
  name: 'gauge-ppreance-form',
  onFieldsChange(props, changedFields) {
    //props.onFieldChanged(changedFields);
  },
  mapPropsToFields(props) {
    let g = {};
    _.forIn(
      props.gaugeSettings.scale.gaugeValue,
      (v, k) => (g[k] = mapProp2Field(v))
    );
    let a = {};
    _.forIn(
      props.gaugeSettings.apperarance,
      (v, k) => (a[k] = mapProp2Field(v))
    );
    let rr = {
      height: mapProp2Field(props.gaugeSettings.height),
      scale: {
        gaugeValue: g,
      },
      data: [{ value: mapProp2Field(props.gaugeSettings.data[0].value) }],
      apperarance: a,
    };

    return rr;
  },
  onValuesChange(props, changedValues, allValues) {
    //props.onFieldChanged(allValues);
  },
})(gaugeForm);
