var flatiron = require('flatiron'),
    path = require('path'),
    restful     = require('restful'),
    resourceful = require('resourceful'),
    app = flatiron.app;

var app = module.exports = flatiron.app;
app.resources = app.resources || {};

app.use(flatiron.plugins.http, {
  headers: {
    'x-powered-by': 'flatiron ' + flatiron.version
  },
  before: [test1],
  after: []
});

function test1(req, res) {
    if(req.url != "/") console.log("We can put the validation here...");
  res.emit('next');
}

var Creature = app.resources.Creature = resourceful.define('creature', function () {
  this.restful = true;
  //this.use('memory');
  this.string('type');
  this.string('description');
});

app.use(restful);

app.on('init', function () {
  var database = app.config.get('database') || {
    host: 'localhost',
    port: 5984
  };
  
  database.database = database.database || 'test';

  resourceful.use('couchdb', database);
  resourceful.autoMigrate = true;
});

app.start(8080, function(){
  console.log(app.router.routes)
  console.log(' > http server started on port 8000');
  console.log(' > visit: http://localhost:8000/ ');
});
