const router = require('koa-router');
const mongoDB = require('../mongodb');

const apiRouter = router();
const db = new mongoDB.db();

apiRouter.get('/api/getall/:collection', async ctx => {
  console.log(ctx.request.url);
  try {
    const cursor = await db.client.collection(ctx.params.collection).find({});
    const ret = await cursor.toArray();
    ctx.body = ret;
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.message = err.message;
  }
});

apiRouter.post('/api/add/:collection', async ctx => {
  try {
    const docs = await db.client
      .collection(ctx.params.collection)
      .insert(ctx.request.body);
    console.log(`POST add ${ctx.request.url} data = ${docs}'`);
    ctx.body = JSON.stringify(docs);
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.message = err;
  }
});

apiRouter.post('/api/update/:collection', async ctx => {
  try {
    const data = ctx.request.body;
    const oldItem = await db.client
      .collection(ctx.params.collection)
      .findOne({ key: data.key });

    const newItem = Object.assign({}, oldItem, { ...data.newItem });
    console.log(`POST ${ctx.request.url} new`, newItem);
    await db.client
      .collection(ctx.params.collection)
      .updateOne({ key: oldItem.key }, { $set: { ...newItem } });
    ctx.response.status = 200;
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.message = err.message;
  }
});

const collenttionTextFields = {
  users: ['name', 'email'],
  devices: ['name', 'ip'],
};

apiRouter.get(
  '/api/fuzzysearch/:collection/:searchString',
  async (ctx, next) => {
    try {
      const { searchString, collection } = ctx.params;
      console.log('GET 2 search  searchText', searchString, collection);
      if (Object.keys(collenttionTextFields).includes(collection)) {
        ctx.response.status = 404;
        ctx.response.message = `Collection ${collection} not found!`;
        next();
      }
      console.log(`GET fuzzysearch 111111 = `);
      let query = {};
      searchString
        ? (query = {
            $or: collenttionTextFields[collection].map(item => {
              let retObj = {};
              retObj[item] = { $regex: searchString };
              return retObj;
            }),
          })
        : (query = {});

      console.log(`GET fuzzysearch query = `, query);
      const cursor = await db.client
        .collection(ctx.params.collection)
        .find(query);
      const result = await cursor.toArray();
      console.log(`GET search ${ctx.request.url} data = `, result);
      ctx.response.body = JSON.stringify(result);
      ctx.response.status = 200;
    } catch (err) {
      ctx.response.status = 400;
      ctx.response.message = err;
    }
  }
);

// apiRouter.delete('/api/devices/delete', async ctx => {
//   console.log('delete request ', ctx.request.body);
//   const keys = ctx.request.body;
//   try {
//     await devicesCollection.remove({ key: { $in: keys } });
//   } catch (err) {
//     ctx.response.status = 400;
//     ctx.response.message = err;
//   }
//   ctx.response.body = { status: 200, msg: 'delete device ok', data: keys };
// });

// //query string /?key1=value1&key2=value2
// // ctx.query = {key1:value1, key2:value2}

// apiRouter.get('/hello', async ctx => {
//   ctx.body = '<h2>Hello</h2>';
//   console.log('get /hello');
// });

module.exports = apiRouter;