var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttrSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Attr', AttrSchema);