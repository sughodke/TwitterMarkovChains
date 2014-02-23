var db = require('./db.js');
var twitter = require('ntwitter');
var EventEmitter = require('events').EventEmitter;
var TweetEmitter = new EventEmitter();

var twit = new twitter({
  consumer_key: '5DPZcVHhc2XFZSvDJOKJug',
  consumer_secret: '4eohKBMvJsPbgElXPSTSFMhAz11w9n6HodWR1xAVbyk',
  access_token_key: '287311191-qx4RDYonNf8UGMQPwJ06eBReSSrf0D5btaNUDYMA',
  access_token_secret: 'grpkPF5qjEBeDs9HCnCRpI712q0vndbyBcTtCEpEoc'
});


var red = '\033[31m', blue = '\033[34m', reset = '\033[0m';

TweetEmitter.on('greatTweet', function(tw) {
  u = tw.u;
  t = tw.t
  console.log(red + u + blue + t + reset);

  var words = ('(SOS) '+t+' (EOS)').split(' ');
  for(var i = 0; i < words.length - 2; i++) {
    var k1 = words[i]
    var k2 = words[i+1];
    var v = words[i+2];

    var inst = new db.chainModel({
        key1: k1
      , key2: k2
      , value: v
      , random: [Math.random(), 1]
    });
    inst.save(); 
  }
});

TweetEmitter.on('goodTweet', function(tw) {
  //console.log(red + tw.u + reset + '!' + tw.t.slice(0,60) + '...');
});


twit.stream('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8,-74,40,-73,41','track':'RT'}, function(stream) {
  stream.on('data', function (data) {
    var u = data.user.screen_name;
    var n = data.user.name;
    var f = data.user.friends_count;
    var l = data.user.lang;
    var t = data.text;

    if (l == 'en') 
      //if (t.match(/[a-zA-Z]*/)[0]) {
      if (t.match(/[^\u0000-\u0080]+/)) {
        TweetEmitter.emit('goodTweet', {'u': u, 't': t});
      }
      else {
        TweetEmitter.emit('greatTweet', {'u': u, 't': t});
      }
  });
});


