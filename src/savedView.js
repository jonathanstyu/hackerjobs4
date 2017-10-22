import React from 'react';
import {FlatList, StyleSheet, Image, Text, View, ActivityIndicator, AsyncStorage, NavigatorIOS} from 'react-native';
import JobHandler from './jobhandler';
import HTMLView from 'react-native-htmlview';

export default class SavedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobstories: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount = async () => {
    var that = this;
    try {
      var jobthreads = await AsyncStorage.getItem('@savedJobs')
      if (jobthreads !== null) {
        var deserializedJobthreads = JSON.parse(jobthreads);
        that.setState({allthreads: deserializedJobthreads})
      }
    } catch (e) {
      console.log(e);
    }
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
      </View>
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

  render = () => {
    var savedList = (<FlatList style={styles.list}
        data={this.state.jobstories}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={this._renderSeparator}
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
        { this.state.jobstories.length == 0 ? empty : savedList}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff'
  },
  cellContainer: {
    padding: 10
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
