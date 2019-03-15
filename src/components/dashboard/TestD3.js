import React, { Component, useState } from 'react';
// import * as d3 from 'd3';
import ReactSpeedometer from 'react-d3-speedometer';
import { Card, Slider, InputNumber, Switch } from 'antd';
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
      needleColor: 'black',
      startColor: '#00ffff',
      endColor: '#000099',
      needleTransitionDuration: 500,
      neddleHeightRatio: 0.9,
      ringWidth: 60,
      tetColor: 'black',
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

  handleGaugePropsChanged = (value, prop) => {
    this.setState(preState => {
      if (value === undefined || value === null) {
        return;
      }
      const newState = { ...preState };
      newState.gaugeProps[prop] = value;
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
        <div className="testSettingBoard" style={{ flex: 1 }}>
          <Card
            size="small"
            title="Gauge settings"
            className="testGaugeSettingCard"
          >
            <Switch
              checkedChildren="refresh"
              unCheckedChildren="frezz"
              onChange={this.handleGaugeRnder}
            />
            <div
              className="settingValue"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <p>Value: </p>
              <Slider
                min={gaugeProps.minValue}
                max={gaugeProps.maxValue}
                value={gaugeProps.value}
                style={{ marginLeft: 16, flex: 1 }}
                onChange={this.handleValueChanged}
              />
              <InputNumber
                min={gaugeProps.minValue}
                max={gaugeProps.maxValue}
                value={gaugeProps.value}
                style={{ marginLeft: 8 }}
                onChange={this.handleValueChanged}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <p>Min: </p>
              <InputNumber
                value={gaugeProps.minValue}
                style={{ marginLeft: 8 }}
                onChange={v => this.handleGaugePropsChanged(v, 'minValue')}
              />
              <p>Max: </p>
              <InputNumber
                value={gaugeProps.maxValue}
                style={{ marginLeft: 8 }}
                onChange={v => this.handleGaugePropsChanged(v, 'maxValue')}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <p>Segment: </p>
              <InputNumber
                min={1}
                value={gaugeProps.segments}
                style={{ marginLeft: 8 }}
                onChange={v => this.handleGaugePropsChanged(v, 'segments')}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <p>Ring width: </p>
              <Slider
                min={10}
                max={gaugeProps.height}
                value={gaugeProps.ringWidth}
                style={{ marginLeft: 16, flex: 1 }}
                onChange={v => this.handleGaugePropsChanged(v, 'ringWidth')}
              />
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

// class BarChart extends Component {
//   componentDidMount() {
//     this.drawChart();
//   }

//   drawChart = () => {
//     const data = [12, 5, 6, 6, 9, 10];
//     const svg = d3
//       .select('#TestD3')
//       .append('svg')
//       .attr('width', 700)
//       .attr('height', 300)
//       .style('margin-left', 50);
//     svg
//       .selectAll('rect')
//       .data(data)
//       .enter()
//       .append('rect')
//       .attr('x', (d, i) => i * 70)
//       .attr('y', (d, i) => 300 - 10 * d)
//       .attr('width', 65)
//       .attr('height', (d, i) => d * 10)
//       .attr('fill', '#e44');
//   };

//   render() {
//     return <div id="TestD3" />;
//   }
// }

export default TestComponent;
