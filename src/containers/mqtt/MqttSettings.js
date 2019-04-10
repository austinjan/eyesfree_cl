import React, { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import MqttBrokerForm from '../../components/forms/MqttBrokerForm';
import MqttStatus from './MqttStatus';
import './mqtt.css';

// react component mqttSettings
const mqttSettings = props => {
  const [mqttStatus, setMqttStatus] = useState('loading');
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchMqttStatus() {
    try {
      setLoading(true);
      const response = await fetch(`/api/mqtt/status`);
      setLoading(false);
      if (!response.ok) {
        setFetchError('Server error: ' + response.statusText);
        return;
      }
      const data = await response.json();
      const { connected } = data;
      setMqttStatus(connected ? 'Connect' : 'Disconnect');
    } catch (e) {
      setFetchError(e.message);
    }
    setFetchError('');
  }

  async function fetchMqttReconnect() {
    try {
      setLoading(true);
      const response = await fetch(`/api/mqtt/reconnect`);
      setLoading(false);
      if (!response.ok) {
        setFetchError('Server error: ' + response.statusText);
        return;
      }
      const data = await response.json();
      const { connected } = data;
      setMqttStatus(connected ? 'Connect' : 'Disconnect');
    } catch (e) {
      setFetchError(e.message);
    }
    setFetchError('');
  }

  const handleReconnect = e => {
    fetchMqttReconnect();
  };

  const handleRefresh = e => {
    fetchMqttStatus();
  };

  const alertClose = e => {
    setFetchError('');
  };

  useEffect(() => {
    fetchMqttStatus();
  }, []);

  let mqttStatusElm;
  if (mqttStatus === 'loading') {
    mqttStatusElm = (
      <div className="settings-flex-row">
        <Spin />
        <h4 style={{ marginLeft: '4px' }}>Loading mqtt connection status...</h4>
      </div>
    );
  } else {
    mqttStatusElm = (
      <MqttStatus
        connected={mqttStatus}
        loading={loading}
        handleReconnect={handleReconnect}
        handleRefresh={handleRefresh}
      />
    );
  }
  return (
    <div className="settings-container">
      {fetchError !== '' ? (
        <Alert
          message={fetchError}
          banner
          closable
          type="error"
          onClose={alertClose}
        />
      ) : null}
      {mqttStatusElm}
      <MqttBrokerForm
        formSettings={{ Host: 'ws://test.mosquitto.com:8080', KeepAlive: 60 }}
      />
    </div>
  );
};

export default mqttSettings;
