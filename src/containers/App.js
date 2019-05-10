import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import { rootReducer } from '../reducers';
import Sidebar from '~/components/sidebar/Sidebar';
import ContentArea from '~/components/layouts/ContentArea';
import Navbar from '~/components/layouts/Navbar';
import rootSagas from '~/sagas';
import createSagaMiddleware from 'redux-saga';
import { initDevices, fetchAllUser } from '../actions';

import './App.css';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const { Header, Sider, Content } = Layout;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSagas);

class App extends Component {
  state = {
    collapsed: false, // sidebar collapsed state
  };
  componentDidMount() {
    store.dispatch(initDevices());
    store.dispatch(fetchAllUser());
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Provider store={store}>
        <Router className="App">
          <Layout>
            <Header>
              <Navbar />
            </Header>
            <Layout>
              <Sider
                collapsible
                onCollapse={this.onCollapse}
                collapsed={collapsed}
              >
                <Sidebar />
              </Sider>
              <Content>
                <ContentArea />
              </Content>
            </Layout>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
