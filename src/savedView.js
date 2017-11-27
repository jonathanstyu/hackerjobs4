import React from 'react';
import {FlatList, Button, StyleSheet, Image, Text, View, ActivityIndicator, AsyncStorage, NavigatorIOS} from 'react-native';
import JobHandler from './jobhandler';
import HTMLView from 'react-native-htmlview';
import {generalstyle, darkstyle, htmlDarkStyle, htmlNormalStyle} from './darkstyle';

import {connect} from 'react-redux';

class SavedView extends React.Component {
  constructor(props) {
    super(props);
    var that = this;
  }

  _keyExtractor = (item, index) => {
    return index
  }

  _onPressItem = (thread) => {
    // this.props.navigator.push({
    //   title: "Thread: " + thread.title,
    //   passProps: {thread: thread}
    // })
  }

  _renderItem = (props) => {
    var jobstory = props['item'];
    return (
      <View key={jobstory}
      style={styles.cellContainer}
      >
      {
        this.props.darkMode ? <HTMLView value={jobstory.text} stylesheet={htmlDarkStyle} /> : <HTMLView value={jobstory.text} stylesheet={htmlNormalStyle} />
      }
      <View style={styles.cellStrip}>
        <Text>Job Stories {props['index']}</Text>
        <Button title="Delete" color='red' onPress={() => this.props.deleteJob(jobstory)} />
        <Button title="Share" onPress={() => this.props.shareJob(jobstory)} />
      </View>
    </View>
    )
  }

  render = () => {
    var savedList = (<FlatList style={[styles.list, (this.props.darkMode ? darkstyle.listDark : null )]}
        data={this.props.savedJobs}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}/>)
    var empty = (
      <View style={[styles.emptyTextContainer,
      (this.props.darkMode ? darkstyle.listDark : null)]}>
        <Text style={[styles.emptyText,
          (this.props.darkMode ? darkstyle.cellCopyDark : null)
          ]}>
          You do not have any stories saved.
        </Text>
      </View>
    )
    return (
      <View style={styles.mainContainer}>
        { this.props.savedJobs.length == 0 ? empty : savedList}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 35
  },
  cellContainer: {
    paddingTop: 10
  },
  cellStrip: {
    flexDirection: "row",
    backgroundColor: 'gainsboro',
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 5,
    paddingLeft: 5,
    borderWidth: 1
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  emptyTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

mapStateToProps = (state) => {
  return {
    savedJobs: state.get('savedJobs'),
    darkMode: state.get('settings')['Dark Mode']
  }
}

mapDispatchToProps = (dispatch) => {
  return {
    deleteJob: (job) => {
      dispatch({
        type: 'delete_job',
        job: job
      })
    },
    shareJob: (job) => {
      dispatch({
        type: 'share_job',
        job: job
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedView)
