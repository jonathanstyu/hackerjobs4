import React from 'react';
import {FlatList, StyleSheet, Image, Text, View, RefreshControl, AsyncStorage} from 'react-native';
import JobHandler from './jobhandler';

// For accessing data
// import WhoThread from './whoThread';

export default class JobListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      allthreads: []
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
    return index
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

  _renderItem(props) {
    var job = props['item'];
    return (
      <View key={job.id} style={styles.cellContainer}>
        <Text>{job.title}</Text>
      </View>
    )
  }

  render() {
    var endIndex = this.state['shownthreads'];
    return (
      <FlatList style={styles.list}
        data={this.state.allthreads}
        keyExtractor={this._keyExtractor}
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
  list: {
    backgroundColor: '#fff'
  },
  cellContainer: {
    padding: 10
  }
});
