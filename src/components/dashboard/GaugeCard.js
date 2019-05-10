import React, { memo, useState, useEffect } from 'react';
import Gauge from './Gauge';
import { Row, Col, Icon, Button } from 'antd';
import WSocket from '~/api/wsocket';

import styles from './GaugeCard.module.less';

const gaugeCard = memo(props => {
  const { title, gaugeSettings, topic } = props;

  const [moreInfo, setMoreInfo] = useState(false);
  const [gaugeValue, setGaugeValue] = useState(0);
  let ws;

  const handleMessage = message => {
    let payload = JSON.parse(message.payload);
    setGaugeValue(payload / 1000);
  };

  useEffect(() => {
    ws = new WSocket();
    ws.on('connect', () => {
      //subscrib topic
      ws.emit({ action: 'change_topic', payload: topic });
    });
    ws.on('disconnect', () => {
      console.log('GaugeCard disconnect websocket!');
    });

    ws.on('message', handleMessage);

    // clean up
    return () => {
      console.log('Gaugecard ws.close()');
      ws.close();
    };
  }, []);

  const informationRow = (
    <Row type="flex" align="middle" justify="center" className={styles.info}>
      <p style={{ display: 'inline-block' }}>Information </p>
      <col span={12} />
    </Row>
  );

  const handleInfoButton = e => {
    setMoreInfo(!moreInfo);
  };

  return (
    <div className={styles.card}>
      <Row className={styles.head} type="flex" align="middle">
        <Col span={18}>
          <p className={styles.title}>{title}</p>
        </Col>
        <Col span={6}>
          <div className={styles.actions}>
            <Button
              shape="circle"
              icon="info"
              size="small"
              onClick={handleInfoButton}
            />
            <Icon type="caret-left" /> <Icon type="caret-right" />
          </div>
        </Col>
      </Row>
      {moreInfo ? informationRow : null}
      <Row>
        <Col span={24}>
          <div className={styles.gauge}>
            <Gauge {...gaugeSettings} value={gaugeValue} />
          </div>
          <span>{gaugeValue}</span>
        </Col>
      </Row>
    </div>
  );
});

export default gaugeCard;
