var db = require('./db.js');
var stream = db.tweetModel.find({},['tweet']).stream();

function isEnglish(st) {

}

stream.on('data', function (doc) {
  if (isEnglish) {
    //get all words
    //pair words
    //insert into db
    console.log(doc)
  }
});
