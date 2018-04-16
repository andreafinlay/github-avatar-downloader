var request = require('request');
var secret = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'user-agent': 'request',
      'authorization': secret
    }
  };
  request(options, function(err, res, body) {
    var parsed = JSON.parse(body);
    for (i = 0; i < parsed.length; i++) {
      var avatar = parsed[i].avatar_url;
      console.log(avatar);
    } callback(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
});
