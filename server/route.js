var express = require('express');

var Entity = require('./entityManager');

module.exports.init = function () {

	var routerApi = express.Router();

	// CREATE NEW ITEM
	routerApi.route('/:collectionName').post(function (req, res) {

		var collectionName = req.params.collectionName;

		var entity = new Entity.getModel(collectionName)();

		Entity.getForm(collectionName).forEach(function (item) {
			if(item.name == '_id') return;
			entity[item.name] = req.body[item.name];
		});

		entity.save(function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'entity created!' });
		});

	});

	// GET ALL ITEMS
	routerApi.route('/:collectionName').get(function (req, res) {

		var collectionName = req.params.collectionName;

		Entity.getModel(collectionName).find().select('-__v').exec(function (err, article) {
			if (err) {
				res.send(err);
			}
			res.json({
				"config": {
					"headers": Entity.getList(collectionName)
				},
				"rows": article
			});
		});
	});

	// GET ONE ITEM
	routerApi.route('/:collectionName/id/:id').get(function (req, res) {

		var collectionName = req.params.collectionName;

		Entity.getModel(collectionName).findById(req.params.id, function (err, entity) {
			if (err) {
				res.send(err);
			}
			res.json({
				"config": {
					"fields": Entity.getForm(collectionName)
				},
				"document": entity
			});
		});
	});

	// GET FORM FOR ITEM
	routerApi.route('/:collectionName/form').get(function (req, res) {

		var collectionName = req.params.collectionName;

		res.json({
			"config": {
				"fields": Entity.getForm(collectionName)
			},
			"document": {}
		});
	});

	// UPDATE ONE ITEM
	routerApi.route('/:collectionName/id/:id').put(function (req, res) {

		var collectionName = req.params.collectionName;

		Entity.getModel(collectionName).findById(req.params.id, function (err, entity) {
			if (err) {
				res.send(err);
			}
			Entity.getForm(collectionName).forEach(function (item) {
				if(item.name == '_id') return;
				entity[item.name] = req.body[item.name];
			});

			entity.save(function (err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'entity updated!' });
			});

		});
	});

	//DELETE ONE ITEM
	routerApi.route('/:collectionName/id/:id').delete(function (req, res) {

		var collectionName = req.params.collectionName;

		Entity.getModel(collectionName).remove({
			_id: req.params.id
		}, function (err, article) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Successfully deleted' });
		});
	});

	return routerApi;
};