var flatiron = require('flatiron');
var path = require('path');
var restful     = require('restful');
var app = flatiron.app;

var app = module.exports = flatiron.app;
app.resources = app.resources || {};

app.use(flatiron.plugins.http, {
  headers: {
    'x-powered-by': 'flatiron ' + flatiron.version
  },
  before: [test1],
  after: []
});

app.use(flatiron.plugins.static, { root: __dirname });

function test1(req, res) {
    if(req.url != "/") console.log("We can put the validation here...");
  res.emit('next');
}

var Creature = app.resources.Creature = require('./app/model/Creature.js')

app.use(restful);

app.on('init', function () {
  var database = app.config.get('database') || {
    host: 'localhost',
    port: 5984
  };
  
  database.database = database.database || 'test';

  var resourceful = require('resourceful');
  resourceful.use('couchdb', database);
  resourceful.autoMigrate = true;
});

app.start(8080, function(){
  console.log(app.router.routes)
  console.log(' > http server started on port 8080');
  console.log(' > visit: http://localhost:8080/ ');
});
