/**
 * Trial Test for Web Design Front-end
 * For GTeam. This is the home Controller JS file
 */
'use strict';
salesApp.controller('homeCtrl', ['$scope', 'loginService', function($scope, loginService){
	$scope.user = {};
	$scope.user.username ='Test';
	$scope.message = 'Dashboard';
	$scope.logout = function(){
		loginService.logout();
	};
}]);
