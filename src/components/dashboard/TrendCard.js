import React, { memo, useState, useEffect } from 'react';
import * as _ from 'lodash';
import Cookies from 'universal-cookie';
import WSocket from '~/api/wsocket';
import { TimelineChart, ChartCard, Field } from 'ant-design-pro/lib/Charts';
import { Icon, Popover, Button, Input, Form } from 'antd';

const cookies = new Cookies();

const getCurrentTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

const TrendCard = memo(props => {
  const { title, topic } = props;
  const [mqttTopic, setMqttTopic] = useState(topic);
  const [showSettings, setShowSettings] = useState(false);
  const [lastArrivalTime, setLastArrivalTime] = useState(getCurrentTime());
  const [mqttDatas, setMqttDatas] = useState([
    {
      x: new Date().getTime(),
      y1: 0,
    },
  ]);
  let ws;

  // WSocket already parse json to object
  const handleMessage = message => {
    //console.log(message);
    //let payload = JSON.parse(message.payload);
    let payload = message.payload || 0;
    mqttDatas.push({ x: new Date().getTime(), y1: payload / 1000 });
    setMqttDatas(mqttDatas);
    setLastArrivalTime(getCurrentTime());
  };

  useEffect(() => {
    const cookieMqttDatas = cookies.get(topic);
    if (cookieMqttDatas) {
      setMqttDatas(cookieMqttDatas);
    }
    ws = new WSocket();

    ws.on('connect', () => {
      ws.emit({ action: 'change_topic', payload: mqttTopic });
    });
    ws.on('disconnect', () => {
      console.log('TrendCard disconnect websocket!');
    });

    ws.on('message', handleMessage);

    // clean up
    return () => {
      console.log('TrendCard ws.close()');
      cookies.set(topic, mqttDatas);
      ws.close();
    };
  }, []);

  const clearCookie = e => {
    e.preventDefault();
    cookies.remove(topic);
    setMqttDatas([]);
  };

  const topicChanged = e => {
    e.preventDefault();
    setMqttTopic(e.target.value);
    console.log('TrendCard emit new topic: ', mqttTopic);
    ws.emit({ action: 'change_topic', payload: mqttTopic });
  };

  const actionComponent = (
    <div>
      <Popover
        trigger="click"
        title="Settings"
        visible={showSettings}
        onVisibleChange={v => setShowSettings(v)}
        content={
          <div>
            <Input value={topic} onChange={topicChanged} />
            <Button onClick={clearCookie} type="default" size="small">
              Clear
            </Button>
          </div>
        }
      >
        <Icon type="setting" />
      </Popover>
    </div>
  );

  return (
    <ChartCard
      title={title}
      footer={<Field label="Last msg arrival: " value={lastArrivalTime} />}
      contentHeight={250}
      action={actionComponent}
    >
      <TimelineChart
        height={220}
        data={mqttDatas}
        titleMap={{ y1: `value from ${topic}` }}
      />
    </ChartCard>
  );
});

export default TrendCard;
