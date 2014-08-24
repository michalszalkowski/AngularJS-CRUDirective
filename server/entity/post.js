var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.model = mongoose.model('Post', new Schema({
	title: String
}));

module.exports.form = [
	{
		"name": "_id",
		"type": "hidden",
		"label": "_id"
	},
	{
		"name": "title",
		"type": "text",
		"label": "Title"
	}
];
module.exports.list = ["_id", "Title"];