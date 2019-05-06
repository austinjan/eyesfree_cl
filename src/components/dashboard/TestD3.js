import React, { Component } from 'react';

import { Card, Row, Col } from 'antd';
import GaugeApperanceFrom from '../forms/GaugeApperanceForm';
import { GaugeCard } from 'Components/dashboard';
import * as lo from 'lodash';
import './dashboard.css';
import 'ant-design-pro/dist/ant-design-pro.css';

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.ws = {};
  }
  state = {
    gaugeProps: {
      height: 450,
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
    },

    timestamp: 'Waiting response',
  };

  handleGaugePropsChanged = newState => {
    console.log('handleGaugePropsChanged ', newState);
    this.setState({ gaugeProps: newState });
  };

  render() {
    const { gaugeProps } = this.state;
    return (
      <div className="testContainer">
        <Row>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <GaugeCard gaugeSettings={{ ...gaugeProps }} />
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <div style={{ flex: 2 }}>
              <Card
                size="small"
                title="Gauge settings"
                style={{ maxWidth: 600 }}
              >
                <GaugeApperanceFrom
                  gaugeSettings={{ ...gaugeProps }}
                  onFieldChanged={this.handleGaugePropsChanged}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TestComponent;
