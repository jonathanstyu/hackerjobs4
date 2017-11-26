import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS, AsyncStorage, TabBarIOS, StatusBar, SafeAreaView} from 'react-native';
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
      <SafeAreaView style={(
        this.props.darkMode ? styles.safeareaBlack: styles.safearea
      )}>
        <StatusBar barStyle={this.props.darkMode ? "light-content" : "dark-content"} />
        <TabBarIOS
          barTintColor={this.props.darkMode ? 'black' : null}
          translucent={true}>
          <TabBarIOS.Item
          systemIcon='featured'
            onPress={() => this.props.selectTab("Jobs")}
            selected={this.props['selectedTab'] == "Jobs"}>
            <NavigatorIOS
              initialRoute={{
                component: JobListView,
                title: "Featured",
                translucent: true
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: 'ghostwhite'
  },
  safeareaBlack: {
    flex: 1,
    backgroundColor: "black"
  }
})

mapStateToProps = (state) => {
  return {
    darkMode: state.get('settings')['Dark Mode'],
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
