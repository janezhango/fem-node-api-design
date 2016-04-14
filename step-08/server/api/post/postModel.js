var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PostSchema = new Schema({
  title:      { required: true, type: String, unique: true },
  text:       { required: true, type: String, unique: true},
  author:     { required: true, type: Schema.Types.ObjectId, ref: 'user'},
  categories: [ {type: Schema.Types.ObjectId, ref: 'category'} /*blueprint*/]
});

module.exports = mongoose.model('post', PostSchema);



/*
Example of querying mongo
--------------------------


Post.find({title: 'someTitle'}, function(err, doc, next){
  if(err) next(err);
  else res.json(doc); //always return an array no matter size
})

 OR ||

Post.find({title: 'someTitle'})
.then(function(err, doc){
  if(err) next(err);
  else res.json(doc); //always return an array no matter size
})

*/
