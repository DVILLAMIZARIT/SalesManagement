/**
 * Portfolio1
 * @author Folly Yovodevi
 * @date: 01/20/2015
 * Holding all the Session Service
 */
'use strict';
salesApp.factory('sessionService', ['$http', function($http){
	return{
		set:function(key, value){
			return sessionStorage.setItem(key, value);
		},
		get:function(key){
			return sessionStorage.getItem(key);
		},
		destroy:function(key){
			$http.post('data/destroy_session.php');
			return sessionStorage.removeItem(key);
		}		
	};
}]);
