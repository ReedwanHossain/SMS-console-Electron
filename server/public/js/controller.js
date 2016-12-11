(function() {
	'use strict';
	var app = angular.module('app', ['autocomplete']);

	app.controller('MainCtrl', function($scope, $http){
		
		$scope.driversName = [];
		$scope.drivers = {};
		$scope.user = {};
		$scope.driver = {};
		$scope.sendToUser = function() {
			console.log($scope.data);
			
			$http.post('http://localhost:3000', $scope.user)
				.success(function(res) {
					console.log(res.data);
				})
				.error(function(err) {
					console.log(err);
				})

			$http.post('http://localhost:3000', $scope.driver)
				.success(function(res) {
					console.log(res.data);
				})
				.error(function(err) {
					console.log(err);
				})
		};

		$scope.sendToDriver = function() {
			console.log($scope.data);
			$http.post('http://localhost:3000', $scope.user)
				.success(function(res) {
					console.log(res.data);
				})
				.error(function(err) {
					console.log(err);
				})
		};
		

		$scope.getOtherFields = function(phone) {
			$http.get('https://351c0d05.ngrok.io/users')
				.success(function(users) {
					users.forEach(function(user) {
  						if (phone == user.phone) {
					 		$scope.user.name = user.name;
					 		$scope.places = user.places;
  						}
					});

					$http.get('https://351c0d05.ngrok.io/drivers')
						.success(function(drivers) {
							$scope.drivers = drivers;
							drivers.forEach(function(driver) {
  								$scope.driversName.push(driver.name);
							});
						})
						.error(function(err) {
							alert(err);
						})
			})
				.error(function(err) {
					alert(err);
				})
		};

		$scope.$watch('driver.name', function() {
			$scope.drivers.forEach(function(driver) {
				if($scope.driver.name == driver.name){
					$scope.driver.phone = driver.phone;
					$scope.user.message = "প্রিয় " + $scope.user.name + " যাত্রা শুরু " + $scope.source + " এবং শেষ " + $scope.destination + "\n চালক " + $scope.driver.name + " মোবাইল নম্বর " + $scope.driver.phone; 
					$scope.driver.message = "ও "+$scope.driver.name +" ভাই !! আপনে "+ $scope.source + " তে "+ $scope.destination + " যান \n নাম: " + $scope.user.name + " নম্বর " + $scope.user.phone; 
				}
			
			})
		
		});
		

	});

}());
