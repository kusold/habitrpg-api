var _ = require('underscore');
var expect = require('chai').expect;
var HabitRPG = require('../lib/apiv2.js');
var Config = require('../config');
var apiConfig = Config.apiSettings;
var config = Config.config;
var apiUrl = Config.apiHostUrl(config);

/* jshint expr:true */

describe('HabitRPG API V2 Tests', function() {
  var api = null;

  before(function(done) {
    expect(apiConfig.apiKey).to.exist.and.to.not.be.empty;
    expect(apiConfig.userId).to.exist.and.to.not.be.empty;
    api = new HabitRPG(apiConfig.userId, apiConfig.apiKey, apiUrl);
    done();
  });

  it('gets the api docs', function (done) {
    api.getApiDocs(function(error, res) {
        expect(error).to.not.exist;
        expect(res).to.exist;
        expect(res.statusCode).to.equal(200);
        // Currently this API Endpoint doesn't return anything
        expect(res.body).to.be.empty;
        done();
    });
  });

  it('gets the api server status', function (done) {
    api.getStatus(function(error, res) {
        expect(error).to.not.exist;
        expect(res).to.exist;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.deep.equal({status: 'up'});
        done();
    });
  });

  it('gets all available content objects', function (done) {
    api.getContent(function(error, res) {
        expect(error).to.not.exist;
        expect(res).to.exist;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('gear');
        expect(res.body).to.have.property('potion');
        expect(res.body).to.have.property('classes');
        expect(res.body).to.have.property('gearTypes');
        expect(res.body).to.have.property('spells');
        expect(res.body).to.have.property('special');
        expect(res.body).to.have.property('dropEggs');
        expect(res.body).to.have.property('questEggs');
        expect(res.body).to.have.property('eggs');
        expect(res.body).to.have.property('specialPets');
        expect(res.body).to.have.property('specialMounts');
        expect(res.body).to.have.property('hatchingPotions');
        expect(res.body).to.have.property('pets');
        expect(res.body).to.have.property('questPets');
        expect(res.body).to.have.property('food');
        expect(res.body).to.have.property('quests');
        expect(res.body).to.have.property('userDefaults');
        done();
    });
  });


  it('gets the user history for export', function (done) {
    api.getHistory(function(error, res) {
        expect(error).to.not.exist;
        expect(res).to.exist;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.empty;
        expect(res.text).to.not.be.empty;
        done();
    });
  });

  it("gets a member's foo");

  describe("User API", function() {
    var taskId = null;
    var tagId = null;

    it("posts a new task to create", function(done) {
      var task = {
        text: 'Test Task',
        notes: 'Notes for Task',
        type: 'todo'
      };

      api.user.createTask(task, function(error, res) {
        expect(error).to.not.exist;
        expect(res).to.exist;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('text').to.equal('Test Task');
        expect(res.body).to.have.property('notes').to.equal('Notes for Task');
        expect(res.body).to.have.property('type').to.equal('todo');
        taskId = res.body._id;
        done();
      });
    });

    it("gets an individual task", function(done) {
      api.user.getTask(taskId, function(error, res) {
        expect(error).to.not.exist;
        expect(res).to.exist;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('text').and.to.equal('Test Task');
        expect(res.body).to.have.property('notes').and.to.equal('Notes for Task');
        expect(res.body).to.have.property('type').and.to.equal('todo');
        expect(res.body).to.have.property('value').and.to.equal(0)
        done();
      });
    });

    it("gets all user's tasks", function(done) {
      api.user.getTasks(function(error, res) {
        expect(error).to.not.exist;
        expect(res).to.have.property('statusCode').and.to.equal(200);
        expect(res.body).to.not.be.empty;
        var task = _.where(res.body,{'id': taskId});
        expect(task).to.have.length.of.at.least(1);
        done();
      });
    });

    it("posts an increase or decrease to user's task score", function(done) {
      var increment = true;
      api.user.updateTaskScore(taskId, increment, function(error, res) {
        expect(error).to.not.exist;
        expect(res).to.have.property('statusCode').and.to.equal(200);
        expect(res.body).to.have.property('delta').and.to.equal(1);

        api.user.getTask(taskId, function(error, res) {
          expect(res.body).to.have.property('value').to.equal(1);
          api.user.updateTaskScore(taskId, 'down', function(error, res) {
            expect(error).to.not.exist;
            expect(res.statusCode).to.equal(200);
            expect(res.body.delta).to.equal(-0.9747);
            done();
          })
        });
      });
    });

    it("puts a user's task to update", function(done) {
      var task = {text: 'Test Task Updated'}
      api.user.updateTask(taskId, task, function(error, res) {
        expect(error).to.not.exist;
        expect(res).to.exist;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('text').to.equal('Test Task Updated');
        expect(res.body).to.have.property('notes').to.equal('Notes for Task');
        expect(res.body).to.have.property('type').to.equal('todo');
        done();
      });
    });
    it("deletes a task", function(done) {
        api.user.deleteTask(taskId, function(error, res) {
          expect(error).to.not.exist;
          expect(res).to.exist;
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    it("posts the sort order of tasks");
    it("posts to clear completed tasks");
    it("posts to unlink a task from its challenge");
    it("posts to buy a gear piece and equip it automatically");
    it("posts to sell inventory items back to Alexander");
    it("posts to purchase a gem-purchaseable item from Alexander");
    it("posts to feed your pet some food");
    it("posts to equip an item (either pets, mounts, or gear)");
    it("posts to pour a hatching potion on an egg");
    it("gets the full user object", function (done) {
      api.user.getUser(function(error, res) {
	expect(error).to.not.exist
	expect(res).to.exist
	expect(res.statusCode).to.equal(200)
	expect(res.body).to.have.property('rewards').to.be.instanceOf(Array)
	expect(res.body).to.have.property('todos').to.be.instanceOf(Array)
	expect(res.body).to.have.property('dailys').to.be.instanceOf(Array)
	expect(res.body).to.have.property('habits').to.be.instanceOf(Array)
	expect(res.body).to.have.property('challenges').to.be.instanceOf(Array)
	expect(res.body).to.have.property('tags').to.be.instanceOf(Array)
	expect(res.body).to.have.property('stats').to.be.instanceOf(Object)
	expect(res.body).to.have.property('profile').to.be.instanceOf(Object)
	expect(res.body).to.have.property('preferences').to.be.instanceOf(Object)
	expect(res.body).to.have.property('party').to.be.instanceOf(Object)
	expect(res.body).to.have.property('newMessages').to.be.instanceOf(Object)
	expect(res.body).to.have.property('lastCron').to.not.be.empty
	expect(res.body).to.have.property('items').to.be.instanceOf(Object)
	expect(res.body).to.have.property('invitations').to.be.instanceOf(Object)
	expect(res.body).to.have.property('history').to.be.instanceOf(Object)
	expect(res.body).to.have.property('flags').to.be.instanceOf(Object)
	expect(res.body).to.have.property('purchased').to.be.instanceOf(Object)
	expect(res.body).to.have.property('filters').to.be.instanceOf(Object)
	expect(res.body).to.have.property('balance').to.equal(0)
	expect(res.body).to.have.property('contributor').to.be.instanceOf(Object)
	expect(res.body).to.have.property('backer').to.be.instanceOf(Object)
	expect(res.body).to.have.property('auth').to.be.instanceOf(Object)
	expect(res.body).to.have.property('achievements').to.be.instanceOf(Object)
	expect(res.body).to.have.property('_id').to.equal('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee')
	done();
      });

    });
    it("puts to update the user object (only certain attributes are supported)");
    it("deletes a user object entirely");
    it("posts to revive your dead user");
    it("posts to drink the fortify potion");
    it("posts to completely reset your account");
    it("posts to toggle whether you are resting in the inn");
    it("posts to rebirth your avatar");
    it("posts to either remove your avatar's class, or change it to something new");
    it("posts to allocate one point towards an attribute");
    it("posts to cast a spell on a target");
    it("posts to unlock a certain gem-purchaseable path (or multiple paths)");
    it("posts to buy gems - NOT SUPPORTED");
    it("posts to cancel subscription - NOT SUPPORTED");
    it("posts to buy gems with paypal - NOT SUPPORTED");
    it("posts to batch update a user");
    it("posts to create a new tag", function(done) {
      var tag = {
	name: 'habitrpg-api'
      };
      api.user.createTag(tag, function(error, res) {
        expect(error).to.not.exist;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.length.of(1);
        expect(res.body[0]).to.have.property('name').and.to.equal(tag.name);
        expect(res.body[0]).to.have.property('id').and.to.not.be.empty;
        tagId = res.body[0].id;
        done();
      });
    });
    it("gets a tag by name", function(done) {
      var tagName = "habitrpg-api"
      api.user.getTagByName(tagName, function(error, res) {
	expect(error).to.not.exist;
	expect(res.statusCode).to.equal(200);
	expect(res.body).to.be.an.instanceOf(Object);
	expect(res.body).to.have.property('name').and.to.equal(tagName);
	expect(res.body).to.have.property('id').and.to.equal(tagId);
	done();
      });
    });
    it("gets a tag by id", function(done) {
      api.user.getTag(tagId, function(error, res) {
	expect(error).to.not.exist;
	expect(res.statusCode).to.equal(200);
	expect(res.body).to.be.an.instanceOf(Object);
	expect(res.body).to.have.property('name').and.to.equal('habitrpg-api');
	expect(res.body).to.have.property('id').and.to.equal(tagId);
	done();
      });
    });
    it("gets a list of tags", function(done) {
      api.user.getTags(function(error, res) {
	expect(error).to.not.exist;
	expect(res.statusCode).to.equal(200);
	expect(res.body).to.be.an.instanceOf(Array);
	expect(res.body).to.have.length(1);
	expect(res.body[0]).to.have.property('name').and.to.equal('habitrpg-api');
	expect(res.body[0]).to.have.property('id').and.to.equal(tagId);
	done();
      });
    });
    it("puts to edit a tag", function(done) {
      tag = {
	name: 'updated-tag'
      };

      api.user.updateTag(tagId, tag, function(error, res) {
	expect(error).to.not.exist;
	expect(res.statusCode).to.equal(200);
	expect(res.body).to.have.property('name').and.to.equal(tag.name);
	expect(res.body).to.have.property('id').and.to.equal(tagId);
	done();
      });
    });
    it("deletes a tag", function(done) {
      api.user.deleteTag(tagId, function(error, res) {
	expect(error).to.not.exist;
	expect(res.statusCode).to.equal(200);
	expect(res.body).to.have.length.of(0);
	done();
      });
    });
  });

  describe('Groups API', function(){
    it("gets a list of groups");
    it("posts to create a group");
    it("gets a group");
    it("posts to edit a group");
    it("posts to join a group");
    it("posts to leave a group");
    it("posts to invite a user to a group");
    it("posts to remove a user from a group")
    it("posts to accept a quest invitation");
    it("posts to reject a quest invitation");
    it("posts to abort a quest");
    it("gets all chat messages");
    it("posts to send a chat message");
    it("posts to flag chat messages for a particular group as seen");
    it("deletes a group");
    it("posts to like a chat message");
  });

  describe('Hall API', function() {
    it('gets a list of the users in the hall of heroes');
    it("gets a user that is in the hall of heroes");
    it("adds a user to the hall of heroes");
    it("gets a list of the patrons for the hall of heroes");
  });

  describe('Challenges API', function() {
    it("gets a list of challenges");
    it("posts to create a challenge");
    it("gets a challenge");
    it("gets a challenge in csv format");
    it("puts to update a challenge");
    it("deletes a challenge");
    it("posts to close a challenge");
    it("posts to join a challenge");
    it("posts to leave a challenge");
    it("gets a user's progress on a particular challege");
  });
});
