import React from 'react';
import {FlatList, StyleSheet, Button, Image, Text, View, ActivityIndicator, AsyncStorage, NavigatorIOS} from 'react-native';
import JobHandler from './jobhandler';
import HTMLView from 'react-native-htmlview';

export default class ThreadView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      jobstories: [],
      // kidsIDs: props.thread.kids,
      paging: 1
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount = async () => {
    var that = this;
    var kidsIDs = this.props.thread.kids; 
    try {
      var endIndex = this.state['paging'] * 30 < kidsIDs.length ? this.state['paging'] * 30: kidsIDs.length;
      var startIndex = (this.state['paging'] - 1) * 30;
      var slicedIDs = kidsIDs.slice(startIndex, endIndex);
      var jobthreads = await JobHandler.batchGet(slicedIDs);
      that.setState({jobstories: jobthreads, refreshing: false})
    } catch (e) {
      console.log(e);
    }
  }

  _keyExtractor = (item, index) => {
    return item.id
  }

  _onPressItem = (thread) => {
    // this.props.navigator.push({
    //   title: "Thread: " + thread.title,
    //   passProps: {thread: thread}
    // })
  }

  _share = async (jobstory) => {
    // JobHandler.saveStory(jobstory)
  }

  _renderItem = (props) => {
    var jobstory = props['item'];
    return (
      <View key={jobstory}
        style={styles.cellContainer}
        >
        <HTMLView style={{
          padding: 10
        }} value={jobstory.text}/>
        <View style={styles.cellStrip}>
          <Text>Job Stories {props['index']}</Text>
          <Button title="Save" onPress={() => this._save(jobstory)} />
          <Button title="Share" onPress={() => this._share(jobstory)} />
        </View>
      </View>
    )
  }

  _endReached = async () => {
    var that = this; 
    var kidsIDs = this.props.thread.kids; 
    var nextPage = this.state['paging'] + 1; 
    var endIndex = nextPage * 30 < kidsIDs.length ? this.state['paging'] * 30: kidsIDs.length;
    var startIndex = this.state['paging'] * 30;
    var slicedIDs = kidsIDs.slice(startIndex, endIndex);
    var newstories = this.state['jobstories'].concat(await JobHandler.batchGet(slicedIDs)); 
    that.setState({jobstories: newstories, paging: nextPage})
  }

  render = () => {
    var renderingScreen = (<View style={styles.spinnerContainer}><ActivityIndicator size={'large'} /></View>)
    var list = (<FlatList style={styles.list}
        data={this.state.jobstories}
        keyExtractor={this._keyExtractor}
        onEndReachedThreshold={0.7}
        onEndReached={this._endReached}
        renderItem={this._renderItem}/>)
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
    backgroundColor: '#fff',
    marginTop: 64,
    marginBottom: 64
  },
  cellContainer: {
    
  },
  cellStrip: {
    flexDirection: "row",
    backgroundColor: 'gainsboro',
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 5,
    paddingLeft: 5
  },
  mainContainer: {
    flex: 1
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  }
});
