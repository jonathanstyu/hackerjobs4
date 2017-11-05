import {Map} from 'immutable'; 
import {createStore} from 'redux'; 
import {AsyncStorage} from 'react-native'; 

var hackerApp = (state, action) => {
  if (typeof state == 'undefined') {
    return Map({
      selectedTab: "Jobs",
      savedJobs: []
    })
  }

  switch (action.type) {
    case "select_tab":
      return state.set('selectedTab', action.tab)
      break;
  
    default:
      return state; 
      break;
  }
}

export default createStore(hackerApp); 