var db = require('./db.js');
var twitter = require('ntwitter');

var twit = new twitter({
  consumer_key: '5DPZcVHhc2XFZSvDJOKJug',
  consumer_secret: '4eohKBMvJsPbgElXPSTSFMhAz11w9n6HodWR1xAVbyk',
  access_token_key: '287311191-qx4RDYonNf8UGMQPwJ06eBReSSrf0D5btaNUDYMA',
  access_token_secret: 'grpkPF5qjEBeDs9HCnCRpI712q0vndbyBcTtCEpEoc'
});

twit.stream('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8,-74,40,-73,41'}, function(stream) {
  stream.on('data', function (data) {
    var red, blue, reset;
    red   = '\033[31m';
    blue  = '\033[34m';
    reset = '\033[0m';

    var u = data.user.screen_name;
    var n = data.user.name;
    var f = data.user.friends_count;
    var l = data.user.lang;
    var t = data.text;

    var inst = new db.tweetModel({
        username: u
      , fcount: f
      , lang: l
      , tweet: t
    });
    inst.save(); 

    var inst2 = new db.colorModel({
        username: u
      , color1: data.user.profile_link_color
      , color2: data.user.profile_background_color
      , color3: data.user.profile_sidebar_fill_color
      , color4: data.user.profile_sidebar_border_color
      , color5: data.user.profile_text_color
      , img1: data.user.profile_background_image_url
      , img2: data.user.profile_image_url
    });
    inst2.save();

    if (l != 'en') 
      //console.log(red + u + reset + '/' + l); // + '/' + t.slice(0,30) + '...');
    else 
      if (t.match(/[a-zA-Z]*/)[0])
        console.log(red + u + reset + '[' + f + ']' + blue + t + reset);
        markovMe(t);
      else
        //console.log(red + u + reset + '!' + t.slice(0,30) + '...');
  });
});


function markovMe(t) {
  var words = (t+' EOS').split(' ');
  
   
}
