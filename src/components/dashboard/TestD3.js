import React, { Component, useState } from 'react';
// import * as d3 from 'd3';
import ReactSpeedometer from 'react-d3-speedometer';
import { Card } from 'antd';
import GaugeApperanceFrom from '../forms/GaugeApperanceForm';
import * as lo from 'lodash';
import './dashboard.css';

class TestComponent extends Component {
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
  };

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
        <div className="testGauge">
          <ReactSpeedometer {...gaugeProps} style={{ padding: '20px' }} />
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
