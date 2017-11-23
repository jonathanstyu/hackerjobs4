import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';


import hackerApp from './src/redux/reducer';
import {loadState, saveState} from './src/redux/persistence';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

import MainApp from './src/main';

var store = createStore(hackerApp, loadState(), applyMiddleware(logger));

store.subscribe(() => {
  saveState(store.getState())
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
  }
}
