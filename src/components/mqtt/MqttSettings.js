import React, { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import MqttBrokerForm from 'Components/forms/MqttBrokerForm';
import MqttSubscribeForm from 'Components/forms/MqttSubscribeForm';
// import { createCrudUrl } from '../../api/crudAPIs';
import MqttStatus from './MqttStatus';
import styles from './mqtt.module.less';
import * as _ from 'lodash';
import { fetchMqttSettings, fetchMqttStatus } from '~/api/mqttAPIs';
// react component mqttSettings
const mqttSettings = props => {
  const [mqttStatus, setMqttStatus] = useState('loading');
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mqttBrokerSettings, setMqttBrokerSettings] = useState({
    key: 'default-mqtt-broker-settings',
    Host: 'test.mosquitto.com',
    Port: 8080,
    ClientID: 'remoteIO',
    Username: '',
    Password: '',
    KeepAlive: 10,
  });
  const [subscribes, setSubscribes] = useState([]);

  const updateData = () => {
    fetchMqttStatus(setLoading)
      .then(connected => {
        connected ? setMqttStatus('Connect') : setMqttStatus('Disconnect');
        setFetchError('');
      })
      .catch(e => setFetchError(e.message));
    fetchMqttSettings(setLoading)
      .then(data => {
        if (data) {
          let dataBroker = {};
          let dataSubcribe = [];
          if (Array.isArray(data)) {
            dataBroker = data[0] || {};
            dataSubcribe = data[0].subscribes || [];
          } else {
            dataBroker = data || {};
            dataSubcribe = data.subscribes || [];
          }
          setMqttBrokerSettings(dataBroker);
          setSubscribes(dataSubcribe);
          setFetchError('');
        }
      })
      .catch(e => setFetchError(e.message));
  };
  useEffect(() => {
    updateData();
  }, []);

  async function fetchMqttReconnect() {
    try {
      setLoading(true);
      const bodydata = { ...mqttBrokerSettings, subscribes: [...subscribes] };
      await fetch(`/apis/v1/mqttsettings`, {
        body: JSON.stringify(bodydata),
        method: 'PUT',
        headers: {
          Accept: 'application/json',
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
    const newState = { ...mqttBrokerSettings };
    _.forEach(changedFields, obj => {
      newState[obj.name] = obj.value;
    });
    setMqttBrokerSettings(newState);
  };
  const handleReconnect = e => {
    fetchMqttReconnect();
  };

  const handleRefresh = e => {
    updateData();
  };

  const alertClose = e => {
    setFetchError('');
  };

  const handleAddSubscribe = v => {
    subscribes.push(v);
    console.log('mqttsetting.js handleAddSubscribe ', v, subscribes);
    setSubscribes(subscribes);
  };

  const handleRemoveSubscribe = v => {
    let arr = [...subscribes];
    const index = _.findIndex(arr, { key: v });
    if (index >= 0) {
      _.pullAt(arr, [index]);
      console.log('mqttsetting.js handleRemoveSubscribe >>>> ', arr);
      setSubscribes(arr);
    }
  };

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

      <MqttSubscribeForm
        subscribes={subscribes}
        handleAddSubscribe={handleAddSubscribe}
        handleRemoveSubscribe={handleRemoveSubscribe}
      />
    </div>
  );
};

export default mqttSettings;
