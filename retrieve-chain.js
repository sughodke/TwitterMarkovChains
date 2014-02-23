var db = require('./db.js');

function getNextLink(i) {
  var pic = Math.random();
  var k1 = i.key2
  var k2 = i.value

  var query = chainModel.find({key1: k1, key2: k2});
  query.select('key1 key2 value')
       .near('random', pic, 1).limit(1)
       .exec(function (err, o) {
          if (err) return handleError(err);
          if (o.length < 1 || o == undefined) { console.log('bug'); return; }
          if (o[0].value != "(EOS)" && o[0].key2 != "(EOS)") {
	    console.log(' ' + o[0].value);
            getNextLink(o[0]);
          }
        });
}

function getFirstLink() {
  var pic = Math.random();

  var query = chainModel.find({key1: '(SOS)'});
  query.select('key1 key2 value')
       .near('random', pic, 1).limit(1)
       .exec(function (err, o) {
          if (err) return handleError(err);
          if (o[0].value != '(EOS)' && o[0].key2 != "(EOS)") {
	    console.log(o[0].key2 + ' ' + o[0].value);
            getNextLink(o[0]);
          }
        });
}

/*
function getChain() {
  var first = getFirstLink();
  var r = first['key2'] + ' ' + first.value;
  
  var i = first;
  while (i.value != '(EOS)') {
    i = getNextLink(i);
    r = r + ' ' + i.value;
  }
  return r
}
*/

setInterval(function() {
getFirstLink();
}, 1529);

