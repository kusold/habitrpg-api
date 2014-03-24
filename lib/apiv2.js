var request = require('superagent');

function HabitRpg(userId, apiKey, apiUrl) {
  this.userId = userId;
  this.apiKey = apiKey;
  this.apiUrl = apiUrl || 'https://habitrpg.com/api/v2'


  this.buildRequest = function (method, endpoint) {
    var req = request;

    if(method === 'GET') {
      req = req.get(this.apiUrl + endpoint);
    }
    req = req.set('x-api-user', this.userId)
             .set('x-api-key', this.apiKey)
             .set('Accept', 'application/json');
    return req;
  }

  this.getApiDocs = function (cb) {
    var req = this.buildRequest('GET', '/api-docs');
    req.end(cb)
  }

  this.getStatus = function (cb) {
    var req = this.buildRequest('GET', '/status');
    req.end(cb);
  }

  this.getContent = function (cb) {
    var req = this.buildRequest('GET', '/content');
    req.end(cb);
  }

  this.getHistory = function (cb) {
    var req = this.buildRequest('GET', '/export/history');
    req.end(cb);
  }
}

module.exports = HabitRpg;
