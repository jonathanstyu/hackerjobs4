
// This class is for retrieving jobs
export default class JobHandler { }

JobHandler.refresh = () => {
  return new Promise(async (resolve, reject) => {
    var response = await fetch('https://hacker-news.firebaseio.com/v0/user/whoishiring.json');
    var jobs = JSON.parse(response['_bodyText'])['submitted'];
    resolve(jobs)
  })
}

JobHandler.buildJobUrl = function (itemID) {
  return fetch("https://hacker-news.firebaseio.com/v0/item/" + itemID + ".json");
}
