
// import WhoThread from './whoThread';
// This class is for retrieving jobs
export default class JobHandler { }

JobHandler.refresh = (hiring=true) => {
  var url = hiring ? 'https://hacker-news.firebaseio.com/v0/user/whoishiring.json' : 'https://hacker-news.firebaseio.com/v0/askstories.json';

  return new Promise(async (resolve, reject) => {
    var promises = [];
    var response = await fetch(url);
    var jobs = JSON.parse(response['_bodyText'])['submitted'];
    var promises = jobs.slice(0, 15).map((jobID) => {
      return fetch("https://hacker-news.firebaseio.com/v0/item/" + jobID + ".json")
        .then((response) => JSON.parse(response['_bodyText']))
    });
    Promise.all(promises).then((result) => resolve(result))
  })
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
