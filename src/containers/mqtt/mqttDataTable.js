import React from 'react';
import { Table } from 'antd';

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
  return (
    <div className="mqtt-container">
      <Table />
    </div>
  );
};

export default mqttDataTable;
