/**
 * Portfolio1:for Web Design Front-end
 * This is the login Controller JS file
 */
'use strict';
salesApp.controller('loginCtrl', ['$scope', 'loginService',function($scope, loginService){
	$scope.message = '';
	
	$scope.login=function(user){
		$scope.user = {};
		$scope.user.username = '';
		$scope.user.password='';
		loginService.login(user, $scope);
	};
}]);
