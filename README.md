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
  - [Groups](#groups)
  - [Miscellaneous](#miscellaneous)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Initializtion ##
```javascript
var habitapi = require('habit-rpg');
new habitapi(userId, apiKey);
```
Alternatively, to point at a custom server:
```javascript
var habitapi = require('habit-rpg');
new habitapi(userId, apiKey, apiUrl);
```

## User ##
**GET /user**

Gets the full user object
```javascript
.getUser(function(response, error){})
```

### Tasks ###
**POST /user/tasks**

Posts a new task to create
```javascript
var task = {
	text: 'New Task',
	type: 'todo'
}
.createTask(task, function(response, error){})
```

**GET /user/tasks/:id**

Gets an individual task
```javascript
.getTask(id, function(response, error){})
```

**GET /user/tasks**

Gets all user tasks
```javascript
.getTasks(function(response, error){})
```

**PUT /user/tasks/:id**

Puts a users task to update
```javascript
var task = {
	text: "Updated text"
}
.updateTask(id, task, function(response, error){})
```

**POST /user/tasks/:id/:direction**

Posts an increase or decrease to a user's task score.
```javascript
var direction = true // Add to score; false to substract
.updateTaskScore(id, direction, function(response, error){})
```

**DEL /user/tasks/:id**

Deletes a task
```javascript
.deleteTask(id, function(response, error){})
```

### Tags ##
**POST /user/tags**

Posts to create a new tag
```javascript
var tag = {
	name: 'habitrpg-api'
}
.createTag(tag, function(response, error){})
```

**GET /api/tags/:name**


This REST Endpoint isn't officially supported by HabitRPG. It get's the entire `user` object and parses out just the tag based on name.
```javascript
.getTagByName(name, function(response, error){})
```

**GET /api/tags/:id**

This REST Endpoint isn't officially supported by HabitRPG. It get's the entire `user` object and parses out just the tag.
```javascript
.getTag(id, function(response, error){})
```

**GET /api/tags**

This REST Endpoint isn't officially supported by HabitRPG. It get's the entire `user` object and parses out just the tags.
```javascript
.getTags(function(response, error){})
```

**PUT /user/tags/:id**

Puts a tag to update it
```javascript
var tag = {
	name: 'update-tag'
}
.updateTag(id, tag, function(response, error){})
```

**DEL /user/tags/:id**

Deletes a tag
```javascript
.deleteTag(id, function(response, error){})
```

## Groups ##
**GET /groups**

Gets a list of all groups
```javascript
.getGroups(function(response, error){})
```

**GET /groups?type=**

Gets a list of all groups of a certain type
```javascript
.getGroupsByType("comma,seperated,string", function(response, error){})
```

**GET /groups/:id**

Gets an individual group
```javascript
.getGroup(id, function(response, error){})
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

# Testing #
Clone the [HabitRPG Repo](https://github.com/HabitRPG/habitrpg/) and follow the [setup instructions](http://habitrpg.wikia.com/wiki/Guidance_for_Blacksmiths).

In the habitrpg-api repo, copy the `config.example.js` file to `config.js` and fill in the `userId` and `apiKey` in the `apiSettings` object for your user on your local copy of HabitRPG.

``` bash
cp config.example.js config.js
```

``` js
var apiSettings = {
  apiKey: 'ReplaceThisWithYourAPIToken',
  userId: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
};
```

Start up the local copy of HabitRPG. And run this command:

``` bash
gulp watch
```

Adjust the lib and test files as needed.
