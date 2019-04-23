import React, { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import MqttBrokerForm from '../../components/forms/MqttBrokerForm';
import { createCrudUrl } from '../../api/crudAPIs';
import MqttStatus from './MqttStatus';
import styles from './mqtt.less';

// react component mqttSettings
const mqttSettings = props => {
  const [mqttStatus, setMqttStatus] = useState('loading');
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mqttBrokerSettings, setMqttBrokerSettings] = useState({
    Host: 'test.mosquitto.com',
    Port: 8080,
    ClientID: 'remoteIO',
  });

  // Get backend server's mqtt settings (server is subscribe of mqtt role)
  async function fetchMqttSettings() {
    try {
      setLoading(true);
      const response = await fetch(`/apis/v1/mqttsettings`);
      setLoading(false);
      if (!response.ok) {
        setFetchError('Server error: ' + response.statusText);
        return;
      }
      const data = await response.json();
      if (data) {
        Array.isArray(data)
          ? setMqttBrokerSettings(data[0])
          : setMqttBrokerSettings(data);
      }
    } catch (err) {
      setFetchError(err.message);
    }
    setFetchError('');
  }

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
      await fetch(`/apis/v1/mqttsettings`, {
        body: JSON.stringify(mqttBrokerSettings),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
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

  const handleFormFieldChanged = changedFields => {
    let newSettints = Object.assign(mqttBrokerSettings, changedFields);
    setMqttBrokerSettings(newSettints);
  };
  const handleReconnect = e => {
    fetchMqttReconnect();
  };

  const handleRefresh = e => {
    fetchMqttStatus();
    fetchMqttSettings();
  };

  const alertClose = e => {
    setFetchError('');
  };

  useEffect(() => {
    fetchMqttStatus();
    fetchMqttSettings();
  }, []);

  let mqttStatusElm;
  if (mqttStatus === 'loading') {
    mqttStatusElm = (
      <div className={styles.mqttFlexRow}>
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
    <div className={styles.mqttContainer}>
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
        formSettings={mqttBrokerSettings}
        onFieldChanged={handleFormFieldChanged}
      />
    </div>
  );
};

export default mqttSettings;
