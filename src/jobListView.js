import React from 'react';
import {FlatList, StyleSheet, Image, Text, View, RefreshControl} from 'react-native';
import JobHandler from './jobhandler';

class JobListCell extends React.Component {
  render() {

    return (
      <View key={this.props.job}>
        <Text>{this.props.job}</Text>
      </View>
    )
  }
}

export default class JobListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      jobs: []
    }
  }

  _keyExtractor = (item, index) => {
    index
  }

  _onRefresh() {
    this.setState({refreshing: true})
    JobHandler.refresh().then((jobs) => {
      var jobs = JSON.parse(jobs['_bodyText'])['submitted'];

      this.setState({refreshing: false, jobs: jobs})
    })
  }

  _renderItem(job) {
    return (
      <JobListCell key={job.item} job={job.item} />
    )
  }

  render() {
    return (
      <FlatList style={styles.list}
        data={this.state['jobs']}
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
});
