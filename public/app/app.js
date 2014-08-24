angular.module('crudApp', [])

	.factory('crudService', function ($http, $q) {

		var URL = {
			_items: function (collectionName) {
				return '/api/{collectionName}'.replace("{collectionName}", collectionName);
			},
			_item: function (collectionName, _id) {
				return '/api/{collectionName}/id/{_id}'.replace("{collectionName}", collectionName).replace("{_id}", _id);
			},
			_form: function (collectionName, _id) {
				return '/api/{collectionName}/form'.replace("{collectionName}", collectionName);
			}
		};

		var getItems = function (collectionName) {

			var deferred = $q.defer();

			$http({method: 'GET', url: URL._items(collectionName)}).success(function (data) {
				deferred.resolve(data);
			});

			return deferred.promise;
		};

		var getItem = function (collectionName, _id) {

			var deferred = $q.defer();

			$http({method: 'GET', url: URL._item(collectionName, _id)}).success(function (data) {
				deferred.resolve({
					fields: data.config.fields,
					document: data.document
				});
			});

			return deferred.promise;
		};

		var getForm = function (collectionName) {

			var deferred = $q.defer();

			$http({method: 'GET', url: URL._form(collectionName)}).success(function (data) {
				deferred.resolve({
					fields: data.config.fields,
					document: data.document
				});
			});

			return deferred.promise;
		};

		var saveItem = function (collectionName, document, callback) {
			$http.post(URL._items(collectionName), document).success(function (data) {
				callback(data);
			});
		};

		var updateItem = function (collectionName, document, callback) {
			$http.put(URL._item(collectionName, document._id), document).success(function (data) {
				callback(data);
			});
		};

		var removeItem = function (collectionName, _id, callback) {
			$http.delete(URL._item(collectionName, _id)).success(function (data) {
				callback(data);
			});
		};

		return{
			getItems: getItems,
			getItem: getItem,
			saveItem: saveItem,
			updateItem: updateItem,
			removeItem: removeItem,
			getForm: getForm
		}
	})

	.directive('crud', function (crudService) {
		return {
			restrict: 'E',
			templateUrl: 'app/tpl/crud.html',
			scope: {
				collectionName: '@'
			},
			controller: function ($scope, $timeout) {

				var setMessage = function(message){
					$scope.message = message;
					$timeout(function() {
						$scope.message = null;
					}, 1000);
				};

				$scope.actionCreate = function () {
					$scope.viewMode = 'create';

					crudService.getForm($scope.collectionName).then(function (details) {
						$scope.details = details;
					});
				};

				$scope.actionList = function () {
					$scope.viewMode = 'list';

					crudService.getItems($scope.collectionName).then(function (list) {
						$scope.list = list;
					});
				};

				$scope.actionDetails = function (id) {

					$scope.viewMode = 'details';

					crudService.getItem($scope.collectionName, id).then(function (details) {
						$scope.details = details;
					});
				};

				$scope.actionSave = function () {
					crudService.saveItem($scope.collectionName, $scope.details.document, function (data) {
						setMessage(data.message);
						$scope.actionList();
					});
				};

				$scope.actionUpdate = function () {
					crudService.updateItem($scope.collectionName, $scope.details.document, function (data) {
						setMessage(data.message);
						$scope.actionList();
					});
				};

				$scope.actionRemove = function (_id) {
					crudService.removeItem($scope.collectionName, _id, function (data) {
						setMessage(data.message);
						$scope.actionList();
					});
				};

				$scope.actionList();
			}
		}
	})
;