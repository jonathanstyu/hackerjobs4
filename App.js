import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'; 
import hackerApp from './src/redux/reducer'; 
import {createStore} from 'redux'; 

import MainApp from './src/main';
import JobHandler from './src/jobhandler'; 

export default class App extends React.Component {
  constructor(props) {
    super(props); 
  }

  render = () => {
    var store = createStore(hackerApp); 
    return (
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
  }
}
