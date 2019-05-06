import React, { Suspense } from 'react';
import { Row, Col, Card } from 'antd';
import styles from './dashboard.module.less';
import { Bar } from 'ant-design-pro/lib/Charts';

const GaugeCard = React.lazy(() => import('./GaugeCard'));

const analyseDashboard = props => {
  const defaultProps = {
    height: 300,
    scale: {
      gaugeValue: {
        min: 0,
        max: 100,
        tickInterval: 10,
      },
    },
    data: [{ value: 15, gaugeValue: 15 }],
    apperarance: {
      color: '#1890FF',
      backgroundColor: '#CBCBCB',
      postText: 'cm',
    },
  };

  return (
    <div className={styles.solidBox}>
      <Row gutter={16}>
        <Col xl={8} lg={12} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <GaugeCard gaugeSettings={defaultProps} title="AI0" />
          </Suspense>
        </Col>
        <Col xl={8} lg={12} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <GaugeCard gaugeSettings={defaultProps} />
          </Suspense>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Suspense fallback={null}>
            <GaugeCard />
          </Suspense>
        </Col>
      </Row>
    </div>
  );
};

export default analyseDashboard;
