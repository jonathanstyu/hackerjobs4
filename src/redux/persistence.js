import {AsyncStorage, AlertIOS} from 'react-native';

export const loadState = () => {
  console.log("hello");
  AsyncStorage.getItem('@persistedstate')
    .then((state) => {
      console.log(state);
      if (state === null) {
        return undefined;
      }
      return JSON.parse(state);
    })
}

export const saveState = async (state) => {
  try {
    var serialized = JSON.stringify(state.toJSON());
    AsyncStorage.setItem('@persistedstate', serialized);
  } catch (e) {
    console.log("Error")
  }
}
