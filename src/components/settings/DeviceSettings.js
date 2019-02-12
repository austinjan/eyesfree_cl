import React from 'react';
import { Button, Form, Table, Input } from 'antd';
import { connect } from 'react-redux';
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
                massage: `請輸入${title}!`,
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

  render() {
    const { editing } = this.state;
    return (
      <div className="toolbar">
        <Button type="default" icon="plus" style={{ margin: '5px' }}>
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
const deviceSettings = () => {
  return (
    <div>
      <ControlBar />
      <Table />
    </div>
  );
};

const mapStateProps = state => ({
  devices
})
const mapDispatchToProps = dispatch =>(

)
export default connect()(deviceSettings);
