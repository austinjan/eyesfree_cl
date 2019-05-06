import React, { memo, useState, useEffect } from 'react';
import Gauge from './Gauge';
import * as _ from 'lodash';
import { Row, Col, Icon, Button } from 'antd';
import WSocket from '~/api/wsocket';

import styles from './GaugeCard.module.less';

const gaugeCard = memo(props => {
  const { title, gaugeSettings } = props;

  const [moreInfo, setMoreInfo] = useState(false);
  const [gaugeValue, setGaugeValue] = useState(0);
  let ws;

  const handleMessage = message => {
    let payload = JSON.parse(message.payload);
    console.log(payload);
    setGaugeValue(payload);
  };

  useEffect(() => {
    ws = new WSocket();
    console.log('Gauge useeffet');
    ws.on('connect', () => {
      console.log('GaugeCard connect websocket!');
      ws.emit({ action: 'change_topic', payload: 'remoteIO/3' });
    });
    ws.on('disconnect', () => {
      console.log('GaugeCard disconnect websocket!');
    });
    ws.on('remoteIO/1', data => {
      console.log('GaugaCard receive: ', data);
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
        </Col>
      </Row>
    </div>
  );
});

export default gaugeCard;
