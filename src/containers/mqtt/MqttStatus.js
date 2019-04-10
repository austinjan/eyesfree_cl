import React, { useState } from 'react';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';

// React component mqttStatus
// props:
//    * connected = ("Connect" | "Disconnect") - mqtt connect status
//    * loading: fetching
//    * handleReconnect: function will handler connect button click
//    * handleRefresh: refresh mqtt status
const mqttStatus = props => {
  const { connected, handleReconnect, handleRefresh, loading } = props;
  const connect = connected === 'Connect' ? true : false;

  let icontype, iconColor;
  if (connect) {
    icontype = 'check-circle';
    iconColor = '#52c41a';
  } else {
    icontype = 'close-circle';
    iconColor = '#c71a1a';
  }
  return (
    <div style={{ display: 'flex', margin: '5px 5px' }}>
      <Icon
        type={icontype}
        theme="twoTone"
        twoToneColor={iconColor}
        style={{ marginTop: 'auto', marginBottom: 'auto' }}
      />
      <span style={{ marginLeft: '5px' }}>{'Mqtt is ' + connected}</span>
      <div className="aligment-right">
        <Button
          type="primary"
          size="small"
          style={{ marginLeft: '10px' }}
          loading={loading}
          onClick={handleReconnect}
        >
          Connect
        </Button>
        <Button
          type="primary"
          size="small"
          style={{ marginLeft: '10px' }}
          loading={loading}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

mqttStatus.propTypes = {
  connected: PropTypes.string,
  handleReconnect: PropTypes.func,
  handleRefresh: PropTypes.func,
  loading: PropTypes.bool,
};

mqttStatus.defaultProps = {
  connected: 'Disconnect',
  handleReconnect: () => {},
  handleRefresh: () => {},
  loading: false,
};

export default mqttStatus;
