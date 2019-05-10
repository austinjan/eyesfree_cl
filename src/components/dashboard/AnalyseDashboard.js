import React, { Suspense } from 'react';
import { Row, Col, Typography, Divider } from 'antd';

import styles from './dashboard.module.less';
import numeral from 'numeral';
import {
  Bar,
  TimelineChart,
  ChartCard,
  Field,
  MiniArea,
} from 'ant-design-pro/lib/Charts';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import Chart from 'react-google-charts';

import * as _ from 'lodash';

const GaugeCard = React.lazy(() => import('./GaugeCard'));
const TrendCard = React.lazy(() => import('./TrendCard'));

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getMonthName = () => {
  const d = new Date();
  return monthNames[d.getMonth()];
};

const getYear = () => {
  const d = new Date();
  return d.getFullYear();
};
const chartData = [];
for (let i = 0; i < 12; i += 1) {
  chartData.push({
    x: new Date().getTime() + 1000 * 60 * 60 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 10),
  });
}

const maxChartData = data => {
  if (!Array.isArray(data)) return 0;
  const arr = data.map(v => v.y1);
  return _.max(arr);
};

const minChartData = data => {
  if (!Array.isArray(data)) return 0;
  const arr = data.map(v => v.y1);
  return _.min(arr);
};

const meanChartData = data => {
  if (!Array.isArray(data)) return 0;
  const arr = data.map(v => v.y1);
  return _.mean(arr);
};

const salesData = [];
const currentMonth = new Date().getMonth();
for (let i = 0; i < currentMonth; i += 1) {
  salesData.push({
    x: monthNames[i],
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const maxSalesData = data => {
  if (!Array.isArray(data)) return 0;
  const arr = data.map(v => v.y);
  return _.max(arr);
};

const minSalesData = data => {
  if (!Array.isArray(data)) return 0;
  const arr = data.map(v => v.y);
  return _.min(arr);
};

const meanSalesData = data => {
  if (!Array.isArray(data)) return 0;
  const arr = data.map(v => v.y);
  return _.mean(arr);
};

const totalSalesData = data => {
  if (!Array.isArray(data)) return 0;
  const arr = data.map(v => v.y);
  return _.sum(arr);
};

const analyseDashboard = props => {
  const defaultProps = {
    height: 300,
    scale: {
      gaugeValue: {
        min: 0,
        max: 10,
        tickInterval: 1,
      },
    },
    data: [{ value: 1, gaugeValue: 1 }],
    apperarance: {
      color: '#1890FF',
      backgroundColor: '#CBCBCB',
      postText: '',
    },
  };

  return (
    <div className={styles.solidBox}>
      <Row>
        <Typography.Title level={2}>Realtime site information</Typography.Title>
        <Typography.Paragraph>
          Realtime visulized site point value. The path of data transfer is
          (site) RemoteIO/1 == mqtt ==> backend == websocket ==> frontend. Every
          data transfer to backend will store into database. You can change to
          [Mqtt records] page to check the database content.
        </Typography.Paragraph>
      </Row>
      <Row gutter={16}>
        <Col xl={8} lg={12} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <GaugeCard
              gaugeSettings={defaultProps}
              title="RemoteIO/1"
              topic="RemoteIO/1"
            />
          </Suspense>
        </Col>
        <Col xl={8} lg={12} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <TrendCard title="RemoteIO/1" topic="RemoteIO/1" />
          </Suspense>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Typography.Title level={2}>
          The production efficiency demo block
        </Typography.Title>
        <Typography.Paragraph>
          There are a lot of resources in the internet, which can help me to
          check datas.
        </Typography.Paragraph>
      </Row>
      <Row gutter={16} style={{ marginTop: '15px' }}>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <ChartCard
            title={<span>Product of {getYear()}</span>}
            total={numeral(totalSalesData(salesData)).format('0,0')}
            contentHeight={134}
          >
            <NumberInfo
              subTitle={<span>Product of {getMonthName()}</span>}
              total={numeral(salesData[currentMonth - 1].y).format('0,0')}
              status={
                salesData[currentMonth - 1].y > salesData[currentMonth - 2].y
                  ? 'up'
                  : 'down'
              }
              subTotal={
                salesData[currentMonth - 1].y - salesData[currentMonth - 2].y
              }
            />
            <MiniArea line height={45} data={salesData} />
          </ChartCard>
        </Col>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="ScatterChart"
            loader={<div>Loading Chart</div>}
            data={[['Time', 'Value'], ...salesData.map(v => [v.x, v.y])]}
            options={{
              title: 'Production quantity of year ',
              hAxis: { title: 'Time' },
              vAxis: { title: 'Value' },
              legend: 'none',
              trendlines: { 0: {} },
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '15px' }}>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <ChartCard
            title="Product trend"
            footer={
              <div style={{ display: 'flex' }}>
                <Field
                  label="Max"
                  value={numeral(maxSalesData(salesData)).format('0,0')}
                />
                <Field
                  label="Min"
                  style={{ marginLeft: 20 }}
                  value={minSalesData(salesData).toString()}
                />
                <Field
                  label="Mean"
                  style={{ marginLeft: 20 }}
                  value={numeral(meanSalesData(salesData)).format('0,0.00')}
                />
              </div>
            }
            contentHeight={250}
          >
            <Bar height={240} data={salesData} />
          </ChartCard>
        </Col>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <ChartCard
            title="Product trend"
            footer={
              <div style={{ display: 'flex' }}>
                <Field
                  label="Max"
                  value={numeral(maxChartData(chartData)).format('0,0')}
                />
                <Field
                  label="Min"
                  style={{ marginLeft: 20 }}
                  value={minChartData(chartData).toString()}
                />
                <Field
                  label="Mean"
                  style={{ marginLeft: 20 }}
                  value={numeral(meanChartData(chartData)).format('0,0.00')}
                />
              </div>
            }
            contentHeight={250}
          >
            <TimelineChart
              height={220}
              data={chartData}
              titleMap={{ y1: 'Pass QA', y2: 'Fail QA' }}
            />
          </ChartCard>
        </Col>
      </Row>
    </div>
  );
};

export default analyseDashboard;
