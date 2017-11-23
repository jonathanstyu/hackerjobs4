import {Map, Set} from 'immutable';
import {AsyncStorage} from 'react-native';

const initialState = {
  selectedTab: "Jobs",
  savedJobs: Set([]),
  settings: {
    "Dark Mode": true,
    "Shuffle Job Threads When Opening": false
  }
}

const hackerApp = (state, action) => {
  if (typeof state == 'undefined') {
    return Map(initialState)
  }

  switch (action.type) {
    case "select_tab":
      return state.set('selectedTab', action.tab)
      break;

    case "save_job":
      var updatedSavedJobs = state.get('savedJobs')
      var newJobs = updatedSavedJobs.add(action.job)
      return state.set('savedJobs', newJobs)

    case "flip_setting":
      var currentSetting = state.get('settings')
      currentSetting[action.settingKey] = !currentSetting[action.settingKey]
      return state.set('settings', currentSetting)

    default:
      return state;
      break;
  }
}

export default hackerApp;
