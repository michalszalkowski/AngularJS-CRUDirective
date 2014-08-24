var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.model = mongoose.model('Article', new Schema({
	name: String,
	desc: String
}));


module.exports.form = [
	{
		"name": "_id",
		"type": "hidden",
		"label": "_id"
	},
	{
		"name": "name",
		"type": "text",
		"label": "Name"
	},
	{
		"name": "desc",
		"type": "text",
		"label": "Description"
	}
];

module.exports.list = ["_id", "Name", "Description"];