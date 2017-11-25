import React from 'react';
import {FlatList, Button, StyleSheet, Image, Text, View, ActivityIndicator, AsyncStorage, NavigatorIOS} from 'react-native';
import JobHandler from './jobhandler';
import HTMLView from 'react-native-htmlview';

import {connect} from 'react-redux';
import darkStyle from './darkstyle';

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
      <HTMLView value={jobstory.text}/>
      <View style={styles.cellStrip}>
        <Text>Job Stories {props['index']}</Text>
        <Button title="Delete" color='red' onPress={() => this._delete(jobstory)} />
        <Button title="Share" onPress={() => this._share(jobstory)} />
      </View>
    </View>
    )
  }

  render = () => {
    console.log(this.props.savedJobs)
    var savedList = (<FlatList style={[styles.list]}
        data={this.props.savedJobs}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}/>)
    var empty = (
      <View style={styles.emptyTextContainer}>
        <Text style={styles.emptyText}>
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
    marginBottom: 64
  },
  cellContainer: {
    paddingTop: 10
  },
  cellStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 5,
    paddingLeft: 5
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 64
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
    savedJobs: state.get('savedJobs')
  }
}

mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedView)
