import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';

import JobHandler from './jobhandler';

import JobListView from './jobListView';

export default class MainApp extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: JobListView,
          title: "HackerJobs2"
        }}
        style={{flex: 1}}
      />
    );
  }
}
