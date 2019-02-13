import React from 'react';
import { Form, Input, Button } from 'antd';

const EditableContext = React.createContext();
const editableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

export const EditableFormRow = Form.create()(editableRow);

export const EditOperationCell = ({
  editing,
  record,
  handlerSave,
  handlerSetEditing,
}) => (
  <EditableContext.Consumer>
    {form => {
      return (
        <div>
          {editing ? (
            <>
              <Button
                type="primary"
                style={{ marginLeft: '5px', marginRight: '5px' }}
                onClick={() => handlerSave(form, record.key)}
              >
                儲存
              </Button>
              <Button
                type="secondary"
                style={{
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
                onClick={() => handlerSetEditing('')}
              >
                離開
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              onClick={() => handlerSetEditing(record.key)}
              style={{ margin: '5px' }}
            >
              編輯
            </Button>
          )}
        </div>
      );
    }}
  </EditableContext.Consumer>
);
export const EditableCell = props => {
  const {
    editing,
    record,
    title,
    dataIndex,
    handleChanged,
    index,
    ...restProps
  } = props;

  return (
    <EditableContext.Consumer>
      {form => {
        const { getFieldDecorator } = form;
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item style={{ margin: 0 }}>
                {getFieldDecorator(dataIndex, {
                  rules: [
                    {
                      required: true,
                      message: `請輸入 ${title}!`,
                    },
                  ],
                  initialValue: record[dataIndex],
                })(<Input />)}
              </Form.Item>
            ) : (
              restProps.children
            )}
          </td>
        );
      }}
    </EditableContext.Consumer>
  );
};
