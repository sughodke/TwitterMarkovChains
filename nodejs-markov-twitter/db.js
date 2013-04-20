var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var sTwitterStore1 = new Schema({
    username : String
  , fcount : Number
  , lang : String
  , tweet : String
});
tweetModel = mongoose.model('Tweet',sTwitterStore1);

var sTwitterStore2 = new Schema({
    username : String
  , color1 : String
  , color2 : String
  , color3 : String
  , color4 : String
  , color5 : String
  , img1 : String
  , img2 : String
});
colorModel = mongoose.model('Color',sTwitterStore2);

var sTwitterStore3 = new Schema({
    source : ObjectId
  , word1 : String
  , word2 : String
  , word3 : String
});
chainModel = mongoose.model('Chain',sTwitterStore3);

exports.tweetModel = tweetModel;
exports.colorModel = colorModel;
exports.chainModel = chainModel;
