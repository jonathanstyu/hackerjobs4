import {Map} from 'immutable'; 
import {AsyncStorage} from 'react-native'; 

var hackerApp = (state, action) => {
  if (typeof state == 'undefined') {
    return Map({
      selectedTab: "Jobs",
      savedJobs: [],
      settings: {
        "Dark Mode": true,
        "Shuffle Job Threads When Opening": false
      }
    })
  }

  switch (action.type) {
    case "load_jobs": 
      return state.set('savedJobs', action.jobs)
      break; 

    case "select_tab":
      return state.set('selectedTab', action.tab)
      break;

    case "save_job":
      JobHandler.saveJob(jobstory)
      return state.set('savedJobs', )
  
    default:
      return state; 
      break;
  }
}

export default hackerApp; 