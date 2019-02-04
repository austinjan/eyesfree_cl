import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router className="App">
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider className="side">徹邊欄</Sider>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
