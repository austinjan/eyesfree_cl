const router = require('koa-router');
const mongoDB = require('../mongodb');

const fileRouter = router();
module.exports = fileRouter;

fileRouter.post('/api/upload', async ctx => {
  console.log('Upload file ', ctx.request.body);
  ctx.response.status = 400;
  ctx.response.message = 'test';
  // try {
  //   await db.client.collection('devices').deleteMany({ key: { $in: keys } });
  // } catch (err) {
  //   ctx.response.status = 400;
  //   ctx.response.message = err;
  // }
});
