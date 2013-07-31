var resourceful = require('resourceful');

module.exports = resourceful.define('creature', function () {
  this.restful = true;
  //this.use('memory');
  this.string('type');
  this.string('description');
});
