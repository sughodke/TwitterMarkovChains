
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.user = function(req, res){
  res.send('user ' + req.params.id);
};

exports.color = function(req, res){
  var db = require('../db.js')
  var query = db.colorModel.find();
  query.skip(req.params.start);
  query.limit(10);
  query.where('color2').ne('C0DEED');
  query.exec(function (err, docs) {
    if (req.params.format == 'json')
      res.send(docs);
    else
      res.render('color', { title: 'aa', docs: docs });
  });
};


exports.oldapps = function(req, res){
  var http = require('http'), htmlparser = require('htmlparser')

  if (!req.params.app) {
    res.send('app ' + req.params.app +
           '\nver ' + req.params.ver +
           '\nact ' + req.params.action);
  }

  var opt = {
              host: 'www.oldapps.com',
              port: 80,
              path: '/'+req.params.app+'.php' 
             };

  var myreq = http.request(opt, function(myres) {
    //res.write("Got response: " + myres.statusCode);
    myres.setEncoding('utf8');
    myres.on('data', function (chunk) {
      //res.write('BODY: ' + chunk);
      res.write('aa : ' + chunk.indexOf('Software Overview'));
    });
  });

  myreq.on('error', function(e) {
    res.send("Got error: " + e.message);
  });

  //do i need this
  myreq.end();

};
