var request = require('superagent');

function HabitRpg(userId, apiKey, apiUrl) {
  this.userId = userId;
  this.apiKey = apiKey;
  this.apiUrl = apiUrl || 'https://habitrpg.com/api/v2'


  this.buildRequest = function () {
    var req = request
              .set('x-api-user', this.userId)
              .set('x-api-key', this.apiKey)
              .set('Accept', 'application/json');
    return req;
  }

  this.getApiDocs = function (cb) {
    var req = this.buildRequest();
    req.get(this.apiUrl + '/apiDocs')
       .end(cb)
  }
}

module.exports = HabitRpg;
