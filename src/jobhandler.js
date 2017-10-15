
// This class is for retrieving jobs
export default class JobHandler { }

JobHandler.refresh = function() {
  return fetch('https://hacker-news.firebaseio.com/v0/user/whoishiring.json');
}

JobHandler.buildJobUrl = function (itemID) {
  return "https://hacker-news.firebaseio.com/v0/item/" + itemID + ".json";
}
