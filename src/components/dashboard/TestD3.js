import React, { Component, useState } from 'react';
// import * as d3 from 'd3';
import ReactSpeedometer from 'react-d3-speedometer';
import { Card, Tooltip, Icon } from 'antd';
import GaugeApperanceFrom from '../forms/GaugeApperanceForm';
import { ChartCard, MiniBar } from 'ant-design-pro/lib/Charts';
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
      value: 0,
      minValue: 0,
      maxValue: 100,
      segments: 3,
      width: 200,
      height: 150,
      fluidWidth: false,
      forceRender: true,
      needleColor: 'black',
      startColor: '#00ffff',
      endColor: '#000099',
      needleTransitionDuration: 500,
      neddleHeightRatio: 0.9,
      ringWidth: 60,
      textColor: 'black',
      currentValueText: '${value}',
      style: { padding: '20px 10px' },
    },
    timestamp: 'Waiting response',
  };

  handleWsMessage = message => {
    this.setState(preState => ({
      ...preState,
      timestamp: message,
    }));
  };

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3001/ws');

    this.ws.onopen = evt => {
      console.log('Connecttion open');
      let sendMsg = {
        name: 'austin',
        age: 17,
        sensors: [{ name: 'di', type: 'bit' }, { name: 'do', type: 'bit' }],
      };
      this.ws.send(JSON.stringify(sendMsg));
    };

    this.ws.onmessage = evt => {
      this.handleWsMessage(evt.data);
    };

    this.ws.onclose = evt => {
      console.log('Connection closed.');
    };
  }

  componentWillUnmount() {
    console.log('unmount !!');
    this.ws.close();
  }

  handleGaugeRnder = checked => {
    this.setState(preState => ({
      ...preState,
      gaugeProps: { ...preState.gaugeProps, forceRender: checked },
    }));
  };

  handleGaugePropsChanged = changedFields => {
    this.setState(preState => {
      const newState = { ...preState };
      lo.forEach(changedFields, obj => {
        newState.gaugeProps[obj.name] = obj.value;
      });

      return newState;
    });
  };
  handleValueChanged = value => {
    if (!value) {
      return;
    }
    this.setState(preState => ({
      ...preState,
      gaugeProps: { ...preState.gaugeProps, value: value },
    }));
  };
  render() {
    const { gaugeProps } = this.state;
    return (
      <div className="testContainer">
        <p>This is the timer value: {this.state.timestamp}</p>
        <div className="testGauge">
          <ChartCard
            title="test"
            action={
              <Tooltip title="test-aaa">
                <Icon type="exclamation-circle-o" />
              </Tooltip>
            }
            total="5,400"
            contentHeight={46}
          />
          <ReactSpeedometer {...gaugeProps} />
        </div>
        <div style={{ flex: 2 }}>
          <Card size="small" title="Gauge settings" style={{ maxWidth: 600 }}>
            <GaugeApperanceFrom
              gaugeSettings={{ ...gaugeProps }}
              onFieldChanged={this.handleGaugePropsChanged}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default TestComponent;
