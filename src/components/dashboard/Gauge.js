import React from 'react';
import { Chart, Axis, Coord, Geom, Guide, Shape } from 'bizcharts';

const { Arc, Html } = Guide;

const defaultProps = {
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
    postText: 'C',
  },
};

// Check input props
const validateProps = props => {
  const { scale, data, apperarance, height } = props;
  const { value } = props;

  let retProps = { ...props };
  // make sure data is not nil
  retProps.scale = scale || defaultProps.scale;
  retProps.data = data || defaultProps.data;
  retProps.apperarance = apperarance || defaultProps.apperarance;
  retProps.height = height || defaultProps.height;

  const min = retProps.scale.gaugeValue.min;
  const max = retProps.scale.gaugeValue.max;

  if (value <= min) {
    retProps.data[0].value = min;
  } else if (value >= max) {
    retProps.data[0].value = max;
  }

  //retProps.data[0].value = value;
  // check input value range
  // if (scale && data) {
  //   console.log('hihi ', scale, data);
  //   retProps.data[0].gaugeValue =
  //     data[0].value < scale.gaugeValue.min
  //       ? scale.gaugeValue.min
  //       : data[0].value;
  //   console.log('retProps.data[0].gaugeValue 1 ', retProps.data[0].gaugeValue);
  //   retProps.data[0].gaugeValue =
  //     data[0].value > scale.gaugeValue.max
  //       ? scale.gaugeValue.max
  //       : data[0].value;
  //   console.log('retProps.data[0].gaugeValue 2 ', retProps.data[0].gaugeValue);
  // }
  // console.log('retProps', retProps);

  return retProps;
};

Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({
      // 获取极坐标系下画布中心点
      x: 0,
      y: 0,
    });
    // 绘制指针
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 12,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff',
      },
    });
  },
});

const Gauge = inputProps => {
  const props = validateProps(inputProps);
  const { data, scale, height } = props;
  const { color, backgroundColor, postText } = props.apperarance;

  return (
    <Chart height={height} data={data} scale={scale} padding="auto" forceFit>
      <Coord
        type="polar"
        startAngle={(-9 / 8) * Math.PI}
        endAngle={(1 / 8) * Math.PI}
        radius={0.75}
      />
      <Axis
        name="gaugeValue"
        zIndex={2}
        line={null}
        label={{
          offset: -16,
          textStyle: {
            fontSize: 14,
            textAlign: 'center',
            textBaseline: 'middle',
          },
        }}
        subTickCount={4}
        subTickLine={{
          length: -8,
          stroke: '#fff',
          strokeOpacity: 1,
        }}
        tickLine={{
          length: -18,
          stroke: '#fff',
          strokeOpacity: 1,
        }}
      />
      <Axis name="1" visible={false} />
      <Guide>
        <Arc
          zIndex={0}
          start={['min', 0.965]}
          end={['max', 0.965]}
          style={{
            // 底灰色
            stroke: backgroundColor,
            lineWidth: 18,
          }}
        />
        <Arc
          zIndex={1}
          start={['min', 0.965]}
          end={[data[0].gaugeValue, 0.965]}
          style={{
            stroke: color,
            lineWidth: 18,
          }}
        />
        <Html
          position={['50%', '85%']}
          html={() =>
            `<div style="width: 100px;text-align: center;font-size: 16px!important; font-weight:500; "><p style="color: rgba(0,0,0,0.85);margin: 0;">${
              data[0].value
            } ${postText}</p></div>`
          }
        />
      </Guide>
      <Geom
        type="point"
        position="gaugeValue*1"
        shape="pointer"
        color={color}
        active={false}
        style={{ stroke: '#fff', lineWidth: 1 }}
      />
    </Chart>
  );
};

export default Gauge;
