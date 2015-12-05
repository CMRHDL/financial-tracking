// var mongoose = require('mongoose');

// // define our nerd model
// // module.exports allows us to pass this to other files when it is called


// module.exports = mongoose.model('Attribtion', {
//     name : {type : String, default: ''}
// });

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttrSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Attr', AttrSchema);