var Article = require('./entity/article').model;
var articleForm = require('./entity/article').form;
var articleList = require('./entity/article').list;

var Post = require('./entity/post').model;
var postForm = require('./entity/post').form;
var postList = require('./entity/post').list;


module.exports.model = {};
module.exports.form = {};
module.exports.list = {};

module.exports.model['article'] = Article;
module.exports.form['article'] = articleForm;
module.exports.list['article'] = articleList;

module.exports.model['post'] = Post;
module.exports.form['post'] = postForm;
module.exports.list['post'] = postList;
