import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS, AsyncStorage, TabBarIOS } from 'react-native';

import JobHandler from './jobhandler';

// Components
import SavedView from './savedView';
import JobListView from './jobListView';
import Settings from './settings';

export default class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      selectedTab: 'Jobs'
    }
  }

  render() {
    return (
      <TabBarIOS tintColor="blue">
        <TabBarIOS.Item
          title="Jobs"
          onPress={() => this.setState({selectedTab: "Jobs"})}
          selected={this.state['selectedTab'] == "Jobs"}>
          <NavigatorIOS
            initialRoute={{
              component: JobListView,
              title: "HackerJobs2",
            }}
            style={{flex: 1}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="bookmarks"
          onPress={() => this.setState({selectedTab: "Saved"})}
          selected={this.state['selectedTab'] == "Saved"}>
          <SavedView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Settings" 
          onPress={() => this.setState({selectedTab: "Settings"})}
          selected={this.state['selectedTab'] == "Settings"}>
          <Settings />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
