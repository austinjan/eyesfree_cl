/* eslint-disable no-unused-vars */
// template: 存放使用者自行定義的範本
//  + gaugeTemplates: [gaugeSetting] Gauge 的範本
//db.gaugeTemplates.insert({minValue: 0,maxValue: 100,segments: 3,width: 200,height: 150,fluidWidth: false,needleColor: 'black',startColor: '#00ffff',endColor: '#000099',needleTransitionDuration: 500,neddleHeightRatio: 0.9,ringWidth: 60,textColor: 'black',currentValueText: '${value}',})
const gaugeSetting = {
  //value: 0,
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
  textColor: 'black',
  currentValueText: '${value}',
  style: { padding: '20px 10px' },
};
