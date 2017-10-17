import React from 'react';
import {FlatList, StyleSheet, Image, Text, View, RefreshControl, AsyncStorage, NavigatorIOS} from 'react-native';
import JobHandler from './jobhandler';

export default class ThreadView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      jobstories: [],
      kidsIDs: props.thread.kids,
      paging: 1
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount = async () => {
    var that = this;
    try {
      // var jobthreads = await AsyncStorage.getItem('@jobthreads')
      // if (jobthreads !== null) {
      //   var deserializedJobthreads = JSON.parse(jobthreads);
      //   that.setState({allthreads: deserializedJobthreads})
      // }
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
    var kid = props['item'];
    console.log(props);
    return (
      <View key={kid}
        style={styles.cellContainer}
        onPressItem={this._onPressItem(kid)}
        >
        <Text>{kid}</Text>
      </View>
    )
  }

  render() {
    return (
      <FlatList style={styles.list}
        data={this.state.kidsIDs}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}/>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff'
  },
  cellContainer: {
    padding: 10
  }
});
