const router = require('koa-router');
const mongoDB = require('../mongodb');
const UdpServer = require('../udp/UdpServer');

const udpServer = new UdpServer();
const devicesRouter = router();
module.exports = devicesRouter;

devicesRouter.get('/api/devices/scan', async ctx => {
  try {
    console.log('/api/devices/scan ', ctx.request.body);
    udpServer.sendHello();
    ctx.response.status = 200;
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.message = 'test';
  }
});
