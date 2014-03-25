var request = require('superagent');

function HabitRpg(userId, apiKey, apiUrl) {
  var self = this;
  this.userId = userId;
  this.apiKey = apiKey;
  this.apiUrl = apiUrl || 'https://habitrpg.com/api/v2';


  this.buildRequest = function (method, endpoint, sendObj) {
    var url = this.apiUrl + endpoint;
    var req = request;

    if(method === 'GET') {
      req = req.get(url);
    }

    if(method === 'POST') {
      if(sendObj) {
        req = req.post(url).send(sendObj);
      } else {
        req = req.post(url);
      }
    }

    if(method === 'PUT') {
      req = req.put(url).send(sendObj);
    }

    if(method === 'DEL') {
      req = req.del(url);
    }

    req = req.set('x-api-user', this.userId)
             .set('x-api-key', this.apiKey)
             .set('Accept', 'application/json');
    return req;
  };

  this.getApiDocs = function (cb) {
    var req = this.buildRequest('GET', '/api-docs');
    req.end(cb);
  };

  this.getStatus = function (cb) {
    var req = this.buildRequest('GET', '/status');
    req.end(cb);
  };

  this.getContent = function (cb) {
    var req = this.buildRequest('GET', '/content');
    req.end(cb);
  };

  this.getHistory = function (cb) {
    var req = this.buildRequest('GET', '/export/history');
    req.end(cb);
  };

  this.user = {
    createTask: function(task, cb) {
      var req = self.buildRequest('POST', '/user/tasks', task);
      req.end(cb);
    },
    getTask: function(id, cb) {
      var req = self.buildRequest('GET', '/user/tasks/' + id);
      req.end(cb);
    },
    getTasks: function(cb) {
      var req = self.buildRequest('GET', '/user/tasks/');
      req.end(cb);
    },
    updateTask: function(id, task, cb) {
      var req = self.buildRequest('PUT', '/user/tasks/' + id, task);
      req.end(cb);
    },
    deleteTask: function(id, cb) {
      var req = self.buildRequest('DEL', '/user/tasks/' + id);
      req.end(cb);
    },
    updateTaskScore: function(id, direction, cb) {
      if(direction === true) {
        direction = 'up';
      } else if(direction === false){
        direction = 'down';
      }

      var req = self.buildRequest('POST', '/user/tasks/' + id +'/' + direction);
      req.end(cb);
    }
  };
}

module.exports = HabitRpg;
