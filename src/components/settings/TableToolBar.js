import React from 'react';
import { Button, Modal } from 'antd';

const tableToolBar = ({ addDevice, scanDevices, removeSelectedDevices }) => {
  return (
    <div className="toolbar">
      <Button
        type="primary"
        icon="search"
        onClick={scanDevices}
        style={{ margin: '5px' }}
      >
        掃描網域裝置
      </Button>
      <Button
        type="default"
        icon="plus"
        onClick={addDevice}
        style={{ margin: '5px' }}
      >
        新增裝置
      </Button>
      <Button
        type="danger"
        icon="delete"
        onClick={removeSelectedDevices}
        style={{ margin: '5px' }}
      >
        移除選取裝置
      </Button>
    </div>
  );
};

export default tableToolBar;
