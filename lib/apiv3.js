var request = require('superagent');
var _ = require('lodash');

var routes = {
  users: '/user',
  tasks: '/tasks'
}

function HabitRpg(userId, apiKey, apiUrl) {
  this.userId = userId;
  this.apiKey = apiKey;
  this.apiUrl = apiUrl || 'https://habitrpg.com/api/v3';

  var self = this;
  // Backwards Compatibility -- Deprecated
  this.user = {
    createTask: self.createTask,
    getTask: self.getTask,
    getTasks: self.getTasks,
    updateTask: self.updateTask,
    deleteTask: self.deleteTask,
    updateTaskScore: self.updateTaskScore,
    getUser: self.getUser,
    createTag: self.createTag ,
    updateTag: self.updateTag,
    deleteTag: self.deleteTag,
    getTagByName: self.getTagByName,
    getTag: self.getTag,
    getTags: self.getTags,
    buildRequest: self.buildRequest,
    apiUrl: self.apiUrl,
    apiKey: self.apiKey,
    userId: self.userId
  }
}

HabitRpg.prototype.buildRequest = function (method, endpoint, sendObj) {
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
}

HabitRpg.prototype.getApiDocs = function (cb) {
  var req = this.buildRequest('GET', '/api-docs');
  req.end(cb);
};

HabitRpg.prototype.getStatus = function (cb) {
  var req = this.buildRequest('GET', '/status');
  req.end(cb);
};

HabitRpg.prototype.getContent = function (cb) {
  var req = this.buildRequest('GET', '/content');
  req.end(cb);
};

HabitRpg.prototype.getHistory = function (cb) {
  var req = this.buildRequest('GET', '/export/history');
  req.end(cb);
};

HabitRpg.prototype.createTask = function(task, cb) {
  var req = this.buildRequest('POST', routes.tasks, task);
  req.end(cb);
};

HabitRpg.prototype.getTask = function(id, cb) {
  var req = this.buildRequest('GET', routes.tasks + '/' + id);
  req.end(cb);
};

HabitRpg.prototype.getTasks = function(cb) {
  var req = this.buildRequest('GET', routes.tasks + '/user');
  req.end(cb);
};

HabitRpg.prototype.updateTask = function(id, task, cb) {
  var req = this.buildRequest('PUT', routes.tasks + '/' + id, task);
  req.end(cb);
};

HabitRpg.prototype.deleteTask = function(id, cb) {
  var req = this.buildRequest('DEL', routes.tasks + '/' + id);
  req.end(cb);
};

HabitRpg.prototype.updateTaskScore = function(id, direction, cb) {
  if(direction === true) {
    direction = 'up';
  } else if(direction === false){
    direction = 'down';
  }

  var req = this.buildRequest('POST', routes.tasks + '/' + id +'/' + direction);
  req.end(cb);
};

HabitRpg.prototype.getUser = function(cb) {
  var req = this.buildRequest('GET', routes.users );
  req.end(cb);
};

HabitRpg.prototype.createTag = function(tag, cb) {
  var req = this.buildRequest('POST', '/user/tags', tag);
  req.end(cb);
};

HabitRpg.prototype.updateTag = function(id, tag, cb) {
  var req = this.buildRequest('PUT', '/user/tags/' + id, tag);
  req.end(cb);
};

HabitRpg.prototype.deleteTag = function(id, cb) {
  var req = this.buildRequest('DEL', '/user/tags/' + id);
  req.end(cb);
};

HabitRpg.prototype.getTagByName =  function(name, cb) {
  this.getUser(function(error, res) {
    if(error) {
      return cb(error, null);
    }

    var tags = res.body.tags;
    var tagFound = _.find(tags, function(tag) {
      return tag.name == name;
    });
    if (!tagFound) {
      tagFound = {};
    }
    res.body = tagFound;
    cb(error, res);
  });
};

HabitRpg.prototype.getTag = function(id, cb) {
  this.getUser(function(error, res) {
    if(error) {
      return cb(error, null);
    }
    var tags = res.body.tags;
    var tagFound = _.find(tags, function(tag) {
      return tag.id == id;
    });
    if(!tagFound) {
      tagFound = {};
    }
    res.body = tagFound;
    cb(error, res);
  });
};

HabitRpg.prototype.getTags = function(cb) {
  this.getUser(function(error, res) {
    if(error) {
      return cb(error, null);
    }
    var tags = res.body.tags;
    res.body = tags;
    cb(error, res);
  });
};

HabitRpg.prototype.getGroups = function(cb) {
  var req = this.buildRequest('GET', '/groups');
  req.end(cb);
};

HabitRpg.prototype.getGroupsByType = function(types, cb) {
  var req = this.buildRequest('GET', '/groups?type=' + types);
  req.end(cb);
};

HabitRpg.prototype.getGroup = function(gid, cb) {
  var req = this.buildRequest('GET', '/groups/' + gid);
  req.end(cb);
};

module.exports = HabitRpg;
