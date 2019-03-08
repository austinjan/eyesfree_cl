const koa = require('koa');
const apiRouter = require('./router/apiRouter');
const bodyParser = require('koa-bodyparser');
const app = new koa();
// const fs = require('fs');

app.use(bodyParser());

app.use(apiRouter.routes());

app.listen(3001, () => {
  console.log('Server running on https://localhost:3001');
});
