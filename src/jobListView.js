import React from 'react';
import {FlatList, StyleSheet, Image, Text, View, RefreshControl} from 'react-native';

class JobListCell extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello there {this.props.job}</Text>
      </View>
    )
  }
}

export default class JobListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {refreshing: false}
  }

  _onRefresh() {
    this.setState({refreshing: true})
    fetchData().then(() => {
      this.setState({refreshing: false})
    })
  }

  render() {
    return (
      <FlatList style={styles.list}
        data={['hello', 'hello2']}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
          />}
        renderItem={({item}) => <JobListCell key={item} job={item} /> }/>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff'
  },
});
