const koa = require("koa");
const router = require("koa-router");
const mongo = require("koa-mongo");
const app = new koa();
const fs = require("fs");

const defaultDevices = require("./static/defaultDevices");

const _ = router();

_.get("/api/devices", async ctx => {
  ctx.body = JSON.stringify(defaultDevices);
  console.log("get /api/devices %o", defaultDevices);
});

//query string /?key1=value1&key2=value2
// ctx.query = {key1:value1, key2:value2}

_.get("/hello", async ctx => {
  ctx.body = "<h2>Hello</h2>";
  console.log("get /hello");
});
app.use(_.routes());

app.listen(3001, () => {
  console.log("Server running on https://localhost:3001");
});
