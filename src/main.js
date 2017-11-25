import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS, AsyncStorage, TabBarIOS, AppState } from 'react-native';
import {connect} from 'react-redux';

import JobHandler from './jobhandler';

// Components
import SavedView from './savedView';
import JobListView from './jobListView';
import SettingsView from './settings';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TabBarIOS tintColor="blue" barStyle="white">
        <TabBarIOS.Item
        systemIcon='featured'
          onPress={() => this.props.selectTab("Jobs")}
          selected={this.props['selectedTab'] == "Jobs"}>
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
          badge={this.props.savedJobsCount == 0 ? null : this.props.savedJobsCount}
          onPress={() => this.props.selectTab("Saved")}
          selected={this.props['selectedTab'] == "Saved"}>
          <NavigatorIOS
            initialRoute={{
              component: SavedView,
              title: "Bookmarked Jobs"
            }}
            style={{flex: 1}}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon='more'
          onPress={() => this.props.selectTab("Settings")}
          selected={this.props['selectedTab'] == "Settings"}>
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

mapStateToProps = (state) => {
  return {
    selectedTab: state.get('selectedTab'),
    savedJobsCount: state.get('savedJobs').length
  }
}

mapDispatchToProps = (dispatch) => {
  return {
    selectTab: (tab) => {
      dispatch({
        type: 'select_tab',
        tab: tab
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
