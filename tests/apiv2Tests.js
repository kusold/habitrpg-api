var expect = require('chai').expect;
var HabitRPG = require('../lib/apiv2.js');
var config = require('../config.js')

describe('HabitRPG API V2 Tests', function() {
  var api = null;

  before(function(done) {
    expect(config.apiKey).to.exist.and.to.not.be.empty;
    expect(config.userId).to.exist.and.to.not.be.empty;
    api = new HabitRPG(config.userId, config.apiKey)
    done();
  });

  it('gets the api docs', function (done) {
    console.log('works')
    done();
  })
})
