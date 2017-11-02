import _ from 'lodash'
import {AsyncStorage} from 'react-native'; 
// import WhoThread from './whoThread';
// This class is for retrieving jobs
export default class JobHandler { }

JobHandler.refresh = (hiring=true) => {
  var url = hiring ? 'https://hacker-news.firebaseio.com/v0/user/whoishiring.json' : 'https://hacker-news.firebaseio.com/v0/askstories.json';

  return new Promise(async (resolve, reject) => {
    var promises = [];
    var response = await fetch(url);
    var jobs = JSON.parse(response['_bodyText'])['submitted'];
    var promises = jobs.slice(0, 18).map((jobID) => {
      return fetch("https://hacker-news.firebaseio.com/v0/item/" + jobID + ".json")
        .then((response) => {
          var parsed = JSON.parse(response['_bodyText'])

          // Big ugly hack so that I can strip off the dates and the "Ask HN: " at the start
          parsed['parsed_title'] = parsed['title'].split(':')[1].split('(')[0].trim();
          return parsed;
        })
    });
    Promise.all(promises).then((result) => {
      resolve(result)
    })
  })
}

JobHandler.parseIntoSections = (raw=[]) => {
  return new Promise((resolve, reject) => {
    var sections = []
  });
}

JobHandler.batchGet = (batchIDs=[]) => {
  return new Promise(async (resolve, reject) => {
    var promises = batchIDs.map((jobID) => {
      return fetch("https://hacker-news.firebaseio.com/v0/item/" + jobID + ".json")
        .then((response) => JSON.parse(response['_bodyText']))
    });
    Promise.all(promises).then((result) => resolve(result))
  })
}

JobHandler.saveJob = (job) => {
  return new Promise(async (resolve, reject) => {
    var jobthreads = await AsyncStorage.getItem('@savedJobs')
    if (jobthreads !== null) {
      var deserializedSavedThreads = JSON.parse(jobthreads);
      var savedThreadsStringified = JSON.stringify(deserializedSavedThreads.push(job));
      resolve(await AsyncStorage.setItem("@savedJobs", savedThreadsStringified))
    } else {
      var toSave = JSON.stringify([job])
      resolve(await AsyncStorage.setItem("@savedJobs", toSave));
    }
  });
}