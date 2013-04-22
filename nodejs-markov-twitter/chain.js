var qualifyingTweet = require('./funnel-mod').TweetEmitter();

var red   = '\033[31m'
  , blue  = '\033[34m'
  , reset = '\033[0m';

qualifyingTweet.on('greatTweet', function(t) {
  console.log(red + u + reset + '[' + f + ']' + blue + t + reset);

  var words = (t+' EOS').split(' ');
});

qualifyingTweet.on('goodTweet', function(t) {
  console.log(red + u + reset + '!' + t.slice(0,65) + '...');

  var words = (t+' EOS').split(' ');
});

qualifyingTweet.start();
