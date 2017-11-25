import React from 'react';
import {Switch, StyleSheet, Image, Text, View, Settings, AsyncStorage, FlatList, TouchableHighlight, AlertIOS} from 'react-native';
import {connect} from 'react-redux';

import {generalstyle, darkstyle} from './darkstyle';

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
        <Text key={props} style={[styles.label,
          this.props.darkMode ? darkstyle.cellCopyDark : null
          ]}>
          {props}
        </Text>
        <Switch
          onValueChange={() => this.props.flipSetting(props)}
          value={this.props.settings[props]} />
      </View>
    )
  }

  render = () => {
    return (
      <View style={[styles.settingsContainer]}>
        <FlatList style={[
          (this.props.darkMode ? darkstyle.listDark : null)
          ]}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) => this._renderItem(item)}
        data={Object.keys(this.props.settings)}
        />
        <TouchableHighlight
          underlayColor={this.props.darkMode ? "white" : "blue"}
          onPress={this.props.emptyJobs}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonStyle}>Delete Bookmarked Jobs</Text>
            </View>
          </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  settingsContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 64
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2
  },
  buttonStyle: {
    color: 'red',
    fontWeight: "bold",
    fontSize: 16,
  }
});

mapStateToProps = (state) => {
  return {
    settings: state.get('settings'),
    darkMode: state.get('settings')['Dark Mode']
  }
}

mapDispatchToProps = (dispatch) => {
  return {
    flipSetting: (settingKey) => {
      dispatch({
        type: 'flip_setting',
        settingKey: settingKey
      })
    },
    emptyJobs: () => {
      dispatch({
        type: "empty_jobs"
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
