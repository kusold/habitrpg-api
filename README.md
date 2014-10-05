habitrpg-api
============
[![Build Status](https://travis-ci.org/Kusold/habitrpg-api.svg?branch=master)](https://travis-ci.org/Kusold/habitrpg-api)
NPM module that wraps the habitrpg-api in an easy to use format.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [habitrpg-api](#habitrpg-api)
  - [Initializtion](#initializtion)
  - [User](#user)
    - [Tasks](#tasks)
    - [Tags](#tags)
  - [Miscellaneous](#miscellaneous)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Initializtion ##
```javascript
var habitapi = require('habit-rpg');
new habitapi(userId, apiKey);
```

## User ##
**GET /user**

Gets the full user object
```javascript
.user.getUser(function(response, error){})
```

### Tasks ###
**POST /user/tasks**

Posts a new task to create
```javascript
var task = {
	text: 'New Task',
	type: 'todo'
}
.user.createTask(task, function(response, error){})
```

**GET /user/tasks/:id**

Gets an individual task
```javascript
.user.getTask(id, function(response, error){})
```

**GET /user/tasks**

Gets all user tasks
```javascript
.user.getTasks(function(response, error){})
```

**PUT /user/tasks/:id**

Puts a users task to update
```javascript
var task = {
	text: "Updated text"
}
.user.updateTask(id, task, function(response, error){})
```

**POST /user/tasks/:id/:direction**

Posts an increase or decrease to a user's task score.
```javascript
var direction = true // Add to score; false to substract
.user.updateTaskScore(id, direction, function(response, error){})
```

**DEL /user/tasks/:id**

Deletes a task
```javascript
.user.deleteTask(id, function(response, error){})
```

### Tags ##
**POST /user/tags**

Posts to create a new tag
```javascript
var tag = {
	name: 'habitrpg-api'
}
.user.createTag(tag, function(response, error){})
```

**GET /api/tags/:name**


This REST Endpoint isn't officially supported by HabitRPG. It get's the entire `user` object and parses out just the tag based on name.
```javascript
.user.getTagByName(name, function(response, error){})
```

**GET /api/tags/:id**

This REST Endpoint isn't officially supported by HabitRPG. It get's the entire `user` object and parses out just the tag.
```javascript
.user.getTag(id, function(response, error){})
```

**GET /api/tags**

This REST Endpoint isn't officially supported by HabitRPG. It get's the entire `user` object and parses out just the tags.
```javascript
.user.getTags(function(response, error){})
```

**PUT /user/tags/:id**

Puts a tag to update it
```javascript
var tag = {
	name: 'update-tag'
}
.user.updateTag(id, tag, function(response, error){})
```

**DEL /user/tags/:id**

Deletes a tag
```javascript
.user.deleteTag(id, function(response, error){})
```

## Miscellaneous ##

**GET /api-docs**

Currently this doesn't return anything, but it is documented.
```javascript
.getApiDocs(function(response, error){})
```

**GET /status**

Get the API server status to determine if it is up
```javascript
.getStatus(function(response, error){})
```

**GET /content**

Gets all available content objects
```javascript
.getContent(function(response, error){})
```

**GET /export/history**

Gets the user history for export
```javascript
.getHisory(function(response, error){})
```
