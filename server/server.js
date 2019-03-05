const koa = require('koa');
const router = require('koa-router');
const monk = require('monk');
const bodyParser = require('koa-bodyparser');
const app = new koa();
// const fs = require('fs');

const devices = require('./static/defaultDevices');

app.use(bodyParser());
const _ = router();
const db = monk('localhost:27017/test');
const devicesCollection = db.get('devices');
_.get('/api/devices', async ctx => {
  ctx.body = JSON.stringify(devices.defaultDevices);
  console.log('get /api/devices %s', ctx.body);
});

_.get('/api/devices/all', async ctx => {
  const docs = await devicesCollection.find();
  ctx.body = JSON.stringify(docs);
  console.log('get /api/devices/all %s', docs);
});

_.post('/api/devices/add', async ctx => {
  const docs = await devicesCollection.insert(ctx.request.body);
  console.log('POST devices/add: %o', docs);
  ctx.response.body = { status: 200, msg: 'add device ok', data: docs };
});

_.post('/api/devices/update', async ctx => {
  const data = ctx.request.body;
  console.log('POST device/update %o', data);
  try {
    const oldItem = await devicesCollection.findOne({ key: data.key });
    const newItem = Object.assign({}, oldItem, { ...data.newDevice });
    await devicesCollection.update({ key: oldItem.key }, { ...newItem });
    console.log('POST /api/devices/update: ', data.newDevice);
  } catch (err) {
    console.log('ERR - POST /api/devices/update: ', err);
    ctx.response.body = { status: 400, msg: err, data };
  }
  ctx.response.body = { status: 200, msg: 'update device ok', data };
  // const devicesCollection = db.get('devices');
  // const docs = await devicesCollection.update(ctx.request.body);
});

_.delete('/api/devices/delete', async ctx => {
  console.log('delete request ', ctx.request.body);
  const keys = ctx.request.body;
  try {
    await devicesCollection.remove({ key: { $in: keys } });
  } catch (err) {
    ctx.response.body = { status: 400, msg: err, data: keys };
  }
  ctx.response.body = { status: 200, msg: 'delete device ok', data: keys };
});

//query string /?key1=value1&key2=value2
// ctx.query = {key1:value1, key2:value2}

_.get('/hello', async ctx => {
  ctx.body = '<h2>Hello</h2>';
  console.log('get /hello');
});
app.use(_.routes());

app.listen(3001, () => {
  console.log('Server running on https://localhost:3001');
});
