let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: String,
    tags: [String],
    author: String,
    comments: [{type: Schema.Types.ObjectId, ref: Comment}],
    likes: {type: Number, default:0},
    slug: {type: String}
}, {timestamps: true});

let Article = mongoose.model('Article', articleSchema);

module.exports = Article;