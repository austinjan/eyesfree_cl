import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Radio, Slider, Input, Button } from 'antd';

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
        <Form.Item label="width" {...formItemLayout}>
          {getFieldDecorator('width', {})(<InputNumber min={100} max={500} />)}
        </Form.Item>
        <Form.Item label="height" {...formItemLayout}>
          {getFieldDecorator('height', {})(<InputNumber min={100} max={500} />)}
        </Form.Item>
        <Form.Item label="min" {...formItemLayout}>
          {getFieldDecorator('minValue', requireRules)(<InputNumber />)}
        </Form.Item>
        <Form.Item label="max" {...formItemLayout}>
          {getFieldDecorator('maxValue', requireRules)(<InputNumber />)}
        </Form.Item>
        <Form.Item label="Start Color" {...formItemLayout}>
          {getFieldDecorator('startColor', requireRules)(
            <input type="color" />
          )}
        </Form.Item>
        <Form.Item label="End Color" {...formItemLayout}>
          {getFieldDecorator('endColor', requireRules)(<input type="color" />)}
        </Form.Item>
        <Form.Item label="Neddle moving duration(ms):" {...formItemLayout}>
          {getFieldDecorator('needleTransitionDuration', {})(
            <InputNumber min={100} max={5000} />
          )}
        </Form.Item>
        <Form.Item label="Ring width:" {...formItemLayout}>
          {getFieldDecorator('ringWidth', {})(
            <Slider min={10} max={gaugeSettings.height} />
          )}
        </Form.Item>
        <Form.Item label="Segments :" {...formItemLayout}>
          {getFieldDecorator('segments', {})(<Slider min={1} max={16} />)}
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
    props.onFieldChanged(changedFields);
  },
  mapPropsToFields(props) {
    const retObj = {};
    Object.keys(props.gaugeSettings).map(
      key => (retObj[key] = mapProp2Field(props.gaugeSettings[key]))
    );
    return retObj;
  },
  onValuesChange(_, changedValues, allValues) {
    //console.log(changedValues, allValues);
  },
})(gaugeForm);
