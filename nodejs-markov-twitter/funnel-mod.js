var db = require('./db.js'),
    twitter = require('ntwitter'),
    sys = require('sys'), 
    events = require('events');

var twit = new twitter({
  consumer_key: '5DPZcVHhc2XFZSvDJOKJug',
  consumer_secret: '4eohKBMvJsPbgElXPSTSFMhAz11w9n6HodWR1xAVbyk',
  access_token_key: '287311191-qx4RDYonNf8UGMQPwJ06eBReSSrf0D5btaNUDYMA',
  access_token_secret: 'grpkPF5qjEBeDs9HCnCRpI712q0vndbyBcTtCEpEoc'
});

function TweetEmitter() {
     if(false === (this instanceof TweetEmitter)) {
        return new TweetEmitter();
    }
    
    events.EventEmitter.call(this);
}


sys.inherits(TweetEmitter, events.EventEmitter);

TweetEmitter.prototype.start = function(){
  var self = this;
  twit.stream('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8,-74,40,-73,41'}, function(stream) {
    stream.on('data', function (data) {
      var u = data.user.screen_name;
      var n = data.user.name;
      var f = data.user.friends_count;
      var l = data.user.lang;
      var t = data.text;
  
      if (l == 'en') 
        if (t.match(/[a-zA-Z]*/)[0]) {
          self.emit('greatTweet', t);
        } else {
          self.emit('goodTweet', t);
        }
    });
  });
};

exports.TweetEmitter = TweetEmitter;

