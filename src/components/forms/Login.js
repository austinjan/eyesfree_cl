import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Radio, Button } from 'antd';
import { AInput, ARadioGroup, ARangePicker } from './ReduxFormComponents';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};

const login = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div>
      <h2 style={{ margin: 'auto', textAlign: 'center', padding: 12 }}>
        Login
      </h2>
      <Form onSubmit={handleSubmit}>
        <Field
          label="Account"
          name="account"
          component={AInput}
          placeholder="Account"
          hasFeedback
        />

        <Field
          label="Email"
          name="email"
          component={AInput}
          type="email"
          placeholder="Email"
        />

        <Field label="Sex" name="sex" component={ARadioGroup} value="male">
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </Field>

        <Field
          label="Filter dates"
          name="rangepicker"
          component={ARangePicker}
          placeholder={['From', 'To']}
          hasFeedback
          onFocus={e => e.preventDefault()}
          onBlur={e => e.preventDefault()}
        />

        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            disabled={pristine || submitting}
            htmlType="submit"
            style={{ marginRight: '10px' }}
          >
            Submit
          </Button>

          <Button disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'login', // a unique identifier for this form
  validate,
})(login);
