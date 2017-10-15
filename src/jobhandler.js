
// This class is for retrieving jobs
export default class JobHandler {
  constructor(properties) {
    this.url = 'https://hacker-news.firebaseio.com/v0/user/whoishiring.json';
    this.jobs = [];
  }
}

JobHandler.prototype.refresh = async function(input) {
  var jobs = await fetch(this.url);
  return jobs;
}

JobHandler.buildJobUrl = function (itemID) {
  return "https://hacker-news.firebaseio.com/v0/item/" + itemID + ".json";
}
