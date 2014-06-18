habitrpg-api
============

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
Gets the full user object
**GET /user**
```javascript
.user.getUser(function(response, error){})
```

### Tasks ###
Posts a new task to create
**POST /user/tasks**
```javascript
var task = {
	text: 'New Task',
	type: 'todo'
}
.user.createTask(task, function(response, error){})
```

Gets an individual task
**GET /user/tasks/:id**
```javascript
.user.getTask(id, function(response, error){})
```

Gets all user tasks
**GET /user/tasks**
```javascript
.user.getTasks(function(response, error){})
```

Puts a users task to update
**PUT /user/tasks/:id**
```javascript
var task = {
	text: "Updated text"
}
.user.updateTask(id, task, function(response, error){})
```

Posts an increase or decrease to a user's task score.
**POST /user/tasks/:id/:direction**
```javascript
var direction = true // Add to score; false to substract
.user.updateTaskScore(id, direction, function(response, error){})
```

Deletes a task
**DEL /user/tasks/:id**
```javascript
.user.deleteTask(id, function(response, error){})
```

### Tags ##
Posts to create a new tag
**POST /user/tags**
```javascript
var tag = {
	name: 'habitrpg-api'
}
.user.createTag(tag, function(response, error){})
```

This REST Endpoint isn't officially supported by HabitRPG. It get's the entire `user` object and parses out just the tag based on name.
**GET /api/tags/:name**
```javascript
.user.getTagByName(name, function(response, error){})
```

This REST Endpoint isn't officially supported by HabitRPG. It get's the entire `user` object and parses out just the tag.
**GET /api/tags/:id**
```javascript
.user.getTag(id, function(response, error){})
```

This REST Endpoint isn't officially supported by HabitRPG. It get's the entire `user` object and parses out just the tags.
**GET /api/tags**
```javascript
.user.getTags(function(response, error){})
```

Puts a tag to update it
**PUT /user/tags/:id**
```javascript
var tag = {
	name: 'update-tag'
}
.user.updateTag(id, tag, function(response, error){})
```

Deletes a tag
**DEL /user/tags/:id**
```javascript
.user.deleteTag(id, function(response, error){})
```

## Miscellaneous ##
Currently this doesn't return anything, but it is documented.
**GET /api-docs**
```javascript
.getApiDocs(function(response, error){})
```

Get the API server status to determine if it is up
**GET /status**
```javascript
.getStatus(function(response, error){})
```

Gets all available content objects
**GET /content**
```javascript
.getContent(function(response, error){})
```

Gets the user history for export
**GET /export/history**
```javascript
.getHisory(function(response, error){})
```