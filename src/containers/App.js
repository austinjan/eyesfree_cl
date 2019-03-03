import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import { rootReducer } from '../reducers';
import Sidebar from '../components/sidebar/Sidebar';
import ContentArea from '../components/layouts/ContentArea';
import rootSagas from '../sagas/sagas';
import createSagaMiddleware from 'redux-saga';

import './App.css';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const { Header, Footer, Sider, Content } = Layout;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSagas);

class App extends Component {
  componentDidMount() {
    store.dispatch({ type: 'INIT_DEVICES' });
  }

  render() {
    return (
      <Provider store={store}>
        <Router className="App">
          <Layout>
            <Header>Header</Header>
            <Layout>
              <Sider className="side">
                <Sidebar />
              </Sider>
              <Content>
                <ContentArea />
              </Content>
            </Layout>
            <Footer>Footer</Footer>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
