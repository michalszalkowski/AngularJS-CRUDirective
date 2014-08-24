module.exports.initDb = function () {

	var mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/generic');

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function () {
		console.log('generic db opened');
	});
};