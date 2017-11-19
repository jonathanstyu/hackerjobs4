import React from 'react';
import {Switch, StyleSheet, Image, Text, View, Settings, AsyncStorage, FlatList, Button, AlertIOS} from 'react-native';
import {connect} from 'react-redux'; 

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount = async () => {

  }

  _keyExtractor = (item, index) => {
    return index
  }

  _renderItem = (props) => {
    return (
      <View key={props}
        style={styles.cellContainer}
        >
        <Text key={props} style={{
          fontWeight: 'bold',
          fontSize: 16
        }}>
          {props}
        </Text>
        <Switch 
          value={this.props.settings[props]} />
      </View>
    )
  }

  render = () => {
    return (
      <View style={styles.settingsContainer}>
        <FlatList style={styles.list}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) => this._renderItem(item)}
        data={Object.keys(this.props.settings)}
        />
        <Button 
          color="red"
          title="Delete Bookmarked Jobs" onPress={() => AsyncStorage.removeItem('@savedJobs', () => AlertIOS.alert("Bookmarked Jobs Deleted"))} />
        <Button 
          color="red"
          title="Reset All Data" onPress={() => AsyncStorage.clear(() => AlertIOS.alert("All gone"))} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 64
  },
  list: {
    backgroundColor: '#fff'
  },
  cellContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainContainer: {
    marginTop: 64,
    flex: 1
  },
  buttonStyle: {
    color: 'red',
  }
});

mapStateToProps = (state) => {
  return {
    settings: state.get('settings')
  }
}

mapDispatchToProps = (dispatch) => {
  return {
    selectTab: (tab) => {
      dispatch({
        type: 'select_tab',
        tab: tab
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)