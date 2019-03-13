import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Dropdown, Menu, Icon, Upload } from 'antd';

const handleInputChanged = (onSearch, e) => {
  onSearch(e.target.value);
};

const handleUploadChanged = info => {
  console.log(info);
};
const DropdownMenu = (
  <Menu>
    <Menu.Item>
      <Upload onChange={handleUploadChanged} action="/api/upload">
        <Icon type="upload" /> Upload devices json file.
      </Upload>
    </Menu.Item>
  </Menu>
);
class TableToolBar extends React.Component {
  render() {
    const { handlers, componentsText } = this.props;
    const { addItem, scanDevices, removeSelectedItems, onSearch } = handlers;

    return (
      <div className="toolbar">
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
