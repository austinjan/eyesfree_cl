const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require("customize-cra");
var path = require("path");
const rewireLess = require("react-app-rewire-less");
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  fixBabelImports("ant-design-pro", {
    libraryName: "ant-design-pro",
    libraryDirectory: "lib",
    style: true,
    camel2DashComponentName: false
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
  }),
  addWebpackAlias({
    Components: path.resolve(__dirname, "src/components"),
    Routers: path.resolve(__dirname, "src/routers"),
    "~": path.resolve(__dirname, "src")
  })
);
