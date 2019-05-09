import React, { useState, useEffect } from 'react';
import { Table, Alert, Spin, Button, Input } from 'antd';
import styles from './mqtt.module.less';
import { fetchMqttDatas, fetchMqttTopics } from '~/api/mqttAPIs';

// Component MqttRecords
const mqttRecords = props => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [mqttDatas, setMqttDatas] = useState([]);
  const [mqttTopics, setMqttTopics] = useState([]);
  const [searchText, setSearch] = useState('');

  useEffect(() => {
    fetchMqttDatas(setLoading)
      .then(v => {
        setMqttDatas(v);
        setFetchError('');
      })
      .catch(e => setFetchError(e.message));
    fetchMqttTopics(setLoading)
      .then(v => {
        setMqttTopics(v);
        setFetchError('');
      })
      .catch(e => setFetchError(e.message));
    // clean up
    return () => {};
  }, []);

  // re fetch datas
  const handleRefresh = e => {
    e.preventDefault();
    fetchMqttDatas(setLoading)
      .then(v => {
        setMqttDatas(v);
        setFetchError('');
      })
      .catch(e => setFetchError(e.message));
  };

  const alertClose = e => {
    setFetchError('');
  };

  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'Topic',
      filters: mqttTopics.map(v => ({ text: v, value: v })),
      onFilter: (value, record) => record.topic === value,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  let mqttStatusElm;
  if (loading) {
    mqttStatusElm = (
      <div className={styles.mqttFlexRow}>
        <Spin />
        <h4 style={{ marginLeft: '4px' }}>Loading mqtt datas...</h4>
      </div>
    );
  } else {
    mqttStatusElm = (
      <div className={styles.mqttStatus}>
        <span style={{ marginLeft: '5px' }}>mqtt records</span>
        <div className={styles.alignRight}>
          <Button
            type="primary"
            size="small"
            loading={loading}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
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

      <Table
        loading={loading}
        dataSource={mqttDatas}
        columns={columns}
        size="small"
        rowKey="_id"
      />
    </div>
  );
};
export default mqttRecords;
