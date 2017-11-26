import React from 'react';
import {Switch, StyleSheet, Image, Text, View, Settings, AsyncStorage, FlatList, TouchableHighlight, AlertIOS} from 'react-native';
import {connect} from 'react-redux';

import {generalstyle, darkstyle} from './darkstyle';

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
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
      <View style={[styles.settingsContainer,
        (this.props.darkMode ? darkstyle.listDark : null)]}>
        <FlatList style={[
          (this.props.darkMode ? darkstyle.listDark : null)
          ]}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) => this._renderItem(item)}
        data={Object.keys(this.props.settings)}
        />
        <TouchableHighlight
          underlayColor={this.props.darkMode ? "white" : "red"}
          style={[styles.buttonContainer,
          (this.props.darkMode ? darkstyle.buttonDark : null)]}
          onPress={this.props.emptyJobs}>
            <Text style={styles.buttonStyle}>Delete Jobs</Text>
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
    flex: 3,
    flexDirection: "column",
    paddingBottom: 65,
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
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10
  },
  buttonStyle: {
    color: 'red',
    fontWeight: "bold",
    fontSize: 20,
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
