import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'antd';

const tableColumns = [
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'mqtt_talbe_c_time',
    editable: false,
  },
  {
    title: 'Topic',
    dataIndex: 'topic',
    key: 'mqtt_talbe_c_topic',
    editable: false,
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'mqtt_talbe_c_message',
    editable: false,
  },
];

const mqttDataTable = props => {
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mqttDatas, setMqttDatas] = useState({});

  useEffect(() => {
    fetchMqttDatas();
  }, []);

  // Fetch APIs
  // Get topic list store in database
  async function fetchMqttDatas() {
    try {
      setLoading(true);
      const response = await fetch(`/api/mqtt/topics`);
      setLoading(false);
      if (!response.ok) {
        setFetchError('Server error: ' + response.statusText);
        return;
      }
      const data = await response.json();
      console.log(data);
    } catch (e) {
      setFetchError(e.message);
    }
    setFetchError('');
  }
  // Get topic list store in database
  async function fetchMqttTopics() {
    try {
      setLoading(true);
      const response = await fetch(`/api/mqtt/topics`);
      setLoading(false);
      if (!response.ok) {
        setFetchError('Server error: ' + response.statusText);
        return;
      }
      const data = await response.json();
      console.log(data);
    } catch (e) {
      setFetchError(e.message);
    }
    setFetchError('');
  }

  const alertClose = e => {
    setFetchError('');
  };

  return (
    <div className="mqtt-container">
      {fetchError !== '' ? (
        <Alert
          message={fetchError}
          banner
          closable
          type="error"
          onClose={alertClose}
        />
      ) : null}
      <Table />
    </div>
  );
};

export default mqttDataTable;
