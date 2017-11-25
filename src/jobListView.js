import React from 'react';
import {SectionList, FlatList, StyleSheet, Image,
  Text, View, RefreshControl,
  AsyncStorage, TouchableHighlight,
  ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';

import {generalstyle, darkstyle} from './darkstyle';

import JobHandler from './jobhandler';
import ThreadView from './threadView';
import SavedView from './savedView';
import Moment from 'moment';
import _ from 'lodash';

// For accessing data
// import WhoThread from './whoThread';

class JobListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      allthreads: [],
      modal: false
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount = async () => {
    var that = this;
    try {
      var jobthreads = await AsyncStorage.getItem('@jobthreads')
      if (jobthreads !== null) {
        var deserializedJobthreads = JSON.parse(jobthreads);
        that.setState({allthreads: deserializedJobthreads})
      }
    } catch (e) {
      console.log(e);
    }
  }

  _keyExtractor = (item, index) => {
    return item.id
  }

  _onRefresh = async () => {
    this.setState({refreshing: true})
    try {
      var response = await JobHandler.refresh();
      var jobsStringify = JSON.stringify(response)
      await AsyncStorage.setItem("@jobthreads", jobsStringify)
      this.setState({refreshing: false, allthreads: response})
    } catch (e) {
      console.log("Error saving: " + e);
    }
  }

  _onPressItem = (thread) => {
    this.props.navigator.push({
      title: thread.parsed_title,
      passProps: {thread: thread},
      component: ThreadView
    })
  }

  _renderItem = (props) => {
    var job = props['item'];
    return (
      <TouchableHighlight key={job.id}
        onPress={() => this._onPressItem(job)}
        style={styles.cellContainer}
        >
        <View style={cellStyle.secondary}>
          <Text style={[
            cellStyle.bodyText,
            this.props.darkMode ? darkstyle.cellCopyDark : null
          ]}>{Moment.unix(job.time).format('MM/YYYY')}</Text>
          <Text style={[
            this.props.darkMode ? darkstyle.cellCopyDark : null
          ]}>{job.kids.length} posts</Text>
        </View>
      </TouchableHighlight>
    )
  }

  _renderSectionHeader = (section) => {
    return (
      <Text style={[styles.titleCell,
        this.props.darkMode ? darkstyle.cellCopyDark : null
        ]}>{section.title}</Text>
    )
  }

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  }

  render() {
    var endIndex = this.state['shownthreads'];
    var organized = _.groupBy(this.state.allthreads, 'parsed_title');
    return (
      <SectionList style={(this.props.darkMode ? darkstyle.listDark : null)}
        sections={[
          {data: organized["Who is hiring?"] || [], title: "Who is hiring?"},
          {data: organized["Who wants to be hired?"] || [], title: "Who wants to be hired"},
          {data: organized["Freelancer? Seeking freelancer?"] || [], title: "Freelancer? Seeking freelancer?"},
        ]}
        keyExtractor={this._keyExtractor}
        renderSectionHeader={({section}) => this._renderSectionHeader(section)}
        ItemSeparatorComponent={this._renderSeparator}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
          title="Refresh for Jobs"
          />}
        renderItem={this._renderItem}/>
    )
  }
}

const styles = StyleSheet.create({
  titleCell: {
    fontWeight: "bold",
    fontSize: 17,
    'padding': 10
  },
  cellContainer: {
    padding: 10
  },
  mainContainer: {
    paddingTop: 64,
    flex: 1
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  }
});

const cellStyle = StyleSheet.create({
  secondary: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  bodyText: {
    fontWeight: '300',
    fontSize: 15
  }
})


mapStateToProps = (state) => {
  return {
    darkMode: state.get('settings')['Dark Mode']
  }
}

mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobListView)
