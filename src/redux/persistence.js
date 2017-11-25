import {AsyncStorage, AlertIOS} from 'react-native';

export const loadState = async () => {
  var state = await AsyncStorage.getItem('@persistedstate');
  if (state === null) {
    return undefined;
  } else {
    return JSON.parse(state)
  }
}

export const saveState = async (state) => {
  try {
    var serialized = JSON.stringify(state.toJSON());
    AsyncStorage.setItem('@persistedstate', serialized);
  } catch (e) {
    console.log("Error")
  }
}
