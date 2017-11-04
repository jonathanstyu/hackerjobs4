import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS, AsyncStorage, TabBarIOS } from 'react-native';

import JobHandler from './jobhandler';

// Components
import SavedView from './savedView';
import JobListView from './jobListView';
import SettingsView from './settings';

export default class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      selectedTab: 'Jobs',
      savedJobs: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount = async () => {
    var that = this;
    try {
      var jobthreads = await AsyncStorage.getItem('@savedJobs')
      if (jobthreads !== null) {
        var deserializedJobthreads = JSON.parse(jobthreads);
        that.setState({savedJobs: deserializedJobthreads})
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <TabBarIOS tintColor="blue">
        <TabBarIOS.Item
        systemIcon='featured'
          onPress={() => this.setState({selectedTab: "Jobs"})}
          selected={this.state['selectedTab'] == "Jobs"}>
          <NavigatorIOS
            initialRoute={{
              component: JobListView,
              title: "Featured",
            }}
            style={{flex: 1}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="bookmarks"
          onPress={() => this.setState({selectedTab: "Saved"})}
          selected={this.state['selectedTab'] == "Saved"}>
          <NavigatorIOS
            initialRoute={{
              component: SavedView,
              title: "Bookmarked Jobs",
              passProps: {savedJobs: this.state['savedJobs']}
            }}
            style={{flex: 1}}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon='more'
          onPress={() => this.setState({selectedTab: "Settings"})}
          selected={this.state['selectedTab'] == "Settings"}>
          <NavigatorIOS
            initialRoute={{
              component: SettingsView,
              title: "Settings"
            }}
            style={{flex: 1}}
            />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
