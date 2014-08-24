var model = {};
var form = {};
var list = {};

module.exports.getModel = function (collectionName) {
	if (model[collectionName] == undefined) {
		model[collectionName] = require('./entity/' + collectionName).model;
	}
	return model[collectionName];
};

module.exports.getList = function (collectionName) {
	if (list[collectionName] == undefined) {
		list[collectionName] = require('./entity/' + collectionName).list;
	}
	return list[collectionName];
};

module.exports.getForm = function (collectionName) {
	if (form[collectionName] == undefined) {
		form[collectionName] = require('./entity/' + collectionName).form;
	}
	return form[collectionName];
};