const koa = require('koa');
const apiRouter = require('./router/apiRouter');
const fileRouter = require('./router/fileRouter');
const koaBody = require('koa-body');
const app = new koa();
// const fs = require('fs');

//app.use(bodyParser());
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024,
    },
    stict: false,
  })
);

app.use(fileRouter.routes());
app.use(apiRouter.routes());

app.listen(3001, () => {
  console.log('Server running on https://localhost:3001');
});
