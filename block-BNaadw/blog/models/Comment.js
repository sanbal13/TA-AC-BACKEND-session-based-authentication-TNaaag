var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({    
    content: {type: String, required: true},
    author: {type: Schema.Types.objectId, ref: 'Author'},
    article: {type: Schema.Types.objectId, ref: 'Article'}
});

module.exports = mongoose.model('Comment', commentSchema);

