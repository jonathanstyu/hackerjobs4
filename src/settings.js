import React from 'react';
import {Switch, StyleSheet, Image, Text, View, ActivityIndicator, AsyncStorage, SectionList} from 'react-native';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount = async () => {

  }

  _keyExtractor = (item, index) => {
    return index
  }

  _renderHeader = (section) => {
    return (
      <View key={section}>
        <Text>{section.title}</Text>
      </View>
    )
  }

  _renderItem = (props) => {
    return (
      <View key={props}
        style={styles.cellContainer}
        >
        <Text key={props}>{props}</Text>
        <Switch />
      </View>
    )
  }

  render = () => {
    return (
      <SectionList style={styles.list}
        keyExtractor={this._keyExtractor}
        renderSectionHeader={({section}) => this._renderHeader(section)}
        renderItem={({item}) => this._renderItem(item)}
        sections={[
          {data: ["darkMode"], title: "Visual"}
        ]}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff'
  },
  cellContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
