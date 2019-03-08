import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const tableToolBar = ({ handlers, componentsText }) => {
  const { addItem, scanDevices, removeSelectedItems } = handlers;

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
