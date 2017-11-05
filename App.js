import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'; 
import store from './src/redux/reducer'; 

import MainApp from './src/main';

import JobListView from './src/jobListView';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
  }
}
