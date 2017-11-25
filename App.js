import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import {Map} from 'immutable';

import hackerApp from './src/redux/reducer';
import {loadState, saveState} from './src/redux/persistence';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'

import MainApp from './src/main';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading: true,
      store: null
    }
  }

  componentWillMount = () => {
    var that = this;
    loadState().then((state) => {
      var store = createStore(hackerApp, state, applyMiddleware(logger));
      store.subscribe(() => {
        saveState(store.getState())
      });
      that.setState({store: store, loading: false})
    })
  }

  render = () => {
    if (this.state.loading) {
      return (
        <View style={loadingScreenStyle.loadingScreen}>
          <Text>Loading</Text>
        </View>
      )
    } else {
      return (
        <Provider store={this.state.store}>
          <MainApp />
        </Provider>
      );
    }
  }
}

const loadingScreenStyle = StyleSheet.create({
  text: {

  },
  loadingScreen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center"
  }
})
