
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('port', 3000);
  app.set('views', __dirname + '/views');
  app.set('view options', { pretty: true });
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat" }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/oldapps/:app?/:ver?/:action?', routes.oldapps);
app.get('/user/:id', routes.user);
app.get('/color/:start?.:format?', routes.color);

app.get('/usage', function(req, res){
  var os = require("os");
  /*
  var cpus = os.cpus();

  var cpu = cpus[0], total = 0;
  for(type in cpu.times)
    total += cpu.times[type];

  var document = {one: Math.round(100.0 * cpu.times['user'] / total),
                  two: Math.round(100.0 * cpu.times['sys'] / total),
                  three: Math.round(100.0 * cpu.times['idle'] / total)};
  */
  var load = os.loadavg();
  var document = {  one: Math.round(load[0] * 100),
                    two: Math.round(load[1] * 100),
                  three: Math.round(load[2] * 100) };

  res.send(JSON.stringify(document));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
