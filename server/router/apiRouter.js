const router = require('koa-router');
const monk = require('monk');

const apiRouter = router();
const db = monk('localhost:27017/test');
const devicesCollection = db.get('devices');

const getCollection = collectionName => {
  const collection = db.get(collectionName);
  console.log(`getCollection ${collectionName} ${collection}`);
  if (!collection) {
    throw Error(`Collection "${collectionName}" not found!`);
  }
  return collection;
};
apiRouter.get('/api/getall/:collection', async ctx => {
  console.log(ctx.request.url);
  try {
    const collection = getCollection(ctx.params.collection);
    console.log(`GET ${ctx.request.url} collection = ${collection}'`);
    const docs = await collection.find();
    console.log(`GET ${ctx.request.url} data = ${docs}'`);
    ctx.body = JSON.stringify(docs);
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.message = err;
  }
});

apiRouter.post('/api/devices/add', async ctx => {
  const docs = await devicesCollection.insert(ctx.request.body);
  console.log('POST devices/add: %o', docs);
  ctx.response.body = { status: 200, msg: 'add device ok', data: docs };
});

apiRouter.post('/api/devices/update', async ctx => {
  const data = ctx.request.body;
  console.log('POST device/update %o', data);
  try {
    const oldItem = await devicesCollection.findOne({ key: data.key });
    const newItem = Object.assign({}, oldItem, { ...data.newDevice });
    await devicesCollection.update({ key: oldItem.key }, { ...newItem });
    console.log('POST /api/devices/update: ', data.newDevice);
  } catch (err) {
    console.log('ERR - POST /api/devices/update: ', err);
    ctx.response.status = 400;
    ctx.response.message = err;
  }
  ctx.response.body = { status: 200, msg: 'update device ok', data };
  // const devicesCollection = db.get('devices');
  // const docs = await devicesCollection.update(ctx.request.body);
});

apiRouter.delete('/api/devices/delete', async ctx => {
  console.log('delete request ', ctx.request.body);
  const keys = ctx.request.body;
  try {
    await devicesCollection.remove({ key: { $in: keys } });
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.message = err;
  }
  ctx.response.body = { status: 200, msg: 'delete device ok', data: keys };
});

//query string /?key1=value1&key2=value2
// ctx.query = {key1:value1, key2:value2}

apiRouter.get('/hello', async ctx => {
  ctx.body = '<h2>Hello</h2>';
  console.log('get /hello');
});

module.exports = apiRouter;
