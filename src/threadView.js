import React from 'react';
import {FlatList, StyleSheet, Image, Text, View, ActivityIndicator, AsyncStorage, NavigatorIOS} from 'react-native';
import JobHandler from './jobhandler';

export default class ThreadView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      jobstories: [],
      kidsIDs: props.thread.kids,
      paging: 1
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount = async () => {
    var that = this;
    try {
      var endIndex = this.state['paging'] * 30 < this.state.kidsIDs.length ? this.state['paging'] * 30: this.state.kidsIDs.length;
      var startIndex = (this.state['paging'] - 1) * 30;
      var slicedIDs = this.state['kidsIDs'].slice(startIndex, endIndex);
      var jobthreads = await JobHandler.batchGet(slicedIDs);
      that.setState({jobstories: jobthreads, refreshing: false})
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
        onPressItem={this._onPressItem()}
        >
        <Text>{jobstory.text}</Text>
      </View>
    )
  }

  render = () => {
    var renderingScreen = (<View style={styles.spinnerContainer}><ActivityIndicator size={'large'} /></View>)
    var list = (<FlatList style={styles.list} data={this.state.jobstories} keyExtractor={this._keyExtractor} renderItem={this._renderItem}/>)
    // Because of the return statement, the block {} is treated like an object literal
    return (
      <View style={styles.mainContainer}>
        { this.state['refreshing'] ? renderingScreen : list }
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
    marginTop: 64,
    flex: 1
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  }
});
