import {Map, Set} from 'immutable';
import {AsyncStorage, ActionSheetIOS, AlertIOS} from 'react-native';
import _ from 'lodash'

const initialState = {
  selectedTab: "Jobs",
  savedJobs: [],
  settings: {
    "Dark Mode": true,
    "Shuffle Job Threads When Opening": true
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
      var updatedSavedJobs = Set(state.get('savedJobs'))
      var newJobs = updatedSavedJobs.add(action.job)
      return state.set('savedJobs', newJobs.toArray())

    case "flip_setting":
      var currentSetting = state.get('settings')
      var newSettings = Object.assign({}, currentSetting)
      newSettings[action.settingKey] = !currentSetting[action.settingKey]
      return state.set('settings', newSettings)

    case 'empty_jobs':
      return state.set('savedJobs', [])

    case 'share_job':
      ActionSheetIOS.showShareActionSheetWithOptions({
        message: 'Check out this job from HakkerJobs: https://hacker-news.firebaseio.com/v0/item/'+action.job.id
      }, () => {}, () => {
        // AlertIOS.alert("Share Complete! Thanks!")
      })
      return state;

    case 'delete_job':
      var newJobs = _.reject(state.get('savedJobs'), {'id': action.job.id})
      return state.set('savedJobs', newJobs)

    default:
      return Map.isMap(state) ? state : Map(state);
      break;
  }
}

export default hackerApp;
