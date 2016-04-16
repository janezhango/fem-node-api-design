var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CategorySchema = new Schema({
  name: { required: true, type: String}
});

module.exports = mongoose.model('category', CategorySchema);
