import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';

const handleInputChanged = (onSearch, e) => {
  onSearch(e.target.value);
};
const tableToolBar = ({ handlers, componentsText }) => {
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
};

tableToolBar.propTypes = {
  handlers: PropTypes.object,
  componentsText: PropTypes.object,
};

tableToolBar.defaultProps = {
  handlers: {},
  componentsText: {},
};
export default tableToolBar;
