var request = require('request');
var secret = require('./secrets');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, callback) {
  if (repoOwner == null || repoName == null) {
  console.log("Error! Pass a second argument.")
} else {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'user-agent': 'request',
      'authorization': secret
    }
  };
  request(options, function(err, res, body) {
    if (err) {
      throw err;
    }
    var parsed = JSON.parse(body);
    callback(err, parsed.map(function(contributor) {
      return {
        url: contributor.avatar_url,
        fileName: contributor.login,
      }
    }));
  });
  }
}

getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);

function downloadImageByURL(err, body) {
  for (let user of body) {
    request.get(user.url)
          .on('error', function (err) {
            throw err;
          })
          .pipe(fs.createWriteStream('./avatars/' + user.fileName + '.jpg'));
  }
}
