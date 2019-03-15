import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Dropdown, Menu, Icon, Row, Col } from 'antd';

const handleInputChanged = (onSearch, e) => {
  onSearch(e.target.value);
};

class TableToolBar extends React.Component {
  state = {};

  render() {
    const { handlers, componentsText } = this.props;
    const { addItem, scanDevices, removeSelectedItems, onSearch } = handlers;

    const DropdownMenu = (
      <Menu>
        <Menu.Item>
          <Icon type="upload" />{' '}
          <Button
            onClick={() => {
              this.setState({ showSecondRow: true });
            }}
          >
            Upload devices' json file.
          </Button>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Row>
          <Col span={16}>
            {componentsText.scan ? (
              <Button
                type="primary"
                icon="search"
                onClick={scanDevices}
                style={{ margin: '5px' }}
              >
                {componentsText.scan}
              </Button>
            ) : null}
            <Button
              type="default"
              icon="plus"
              onClick={addItem}
              style={{ margin: '5px' }}
            >
              {componentsText.add}
            </Button>

            <Button
              type="danger"
              icon="delete"
              onClick={removeSelectedItems}
              style={{ margin: '5px' }}
            >
              {componentsText.remove}
            </Button>

            <Dropdown overlay={DropdownMenu} trigger={['click']}>
              <Button type="default" icon="down" style={{ margin: '5px' }}>
                more...
              </Button>
            </Dropdown>
          </Col>

          <Col span={8}>
            {onSearch ? (
              <Input.Search
                onChange={e => handleInputChanged(onSearch, e)}
                onSearch={onSearch}
                style={{
                  right: '5px',
                  margin: '5px',
                  maxWidth: '450px',
                  position: 'absolute',
                }}
              />
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

TableToolBar.propTypes = {
  handlers: PropTypes.object,
  componentsText: PropTypes.object,
  tableInformation: PropTypes.object,
};

TableToolBar.defaultProps = {
  handlers: {},
  componentsText: {},
  tableInformation: {},
};
export default TableToolBar;
