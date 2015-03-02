/**
 * Portfolio1: for Web Design Front-end
 * This is the login Service JS file
 */
'use stric';
salesApp.factory('loginService', ['$http', '$location', 'sessionService', function($http, $location, sessionService){
	return{
		login: function(data, scope){
			var $promise = $http.post('data/user.php', data);
			$promise.then(function(info){
				var uid = info.data;
				if(uid){
					scope.user.username = data.username;
					sessionService.set('uid', uid);
					$location.path('/home');
				}else {
					scope.message='Login Failed Incorrect Credentials!';
					$location.path('/login');
					scope.user.username = 'Cedric';
					scope.user.password='';
				}
			});
		},
		logout: function(){
			sessionService.destroy('uid');
			$location.path('/login');
		},
		islogged: function(){
			var $checkSessionServer = $http.post('data/check_session.php');
			return $checkSessionServer;
		/* if(sessionService.get('user')) return true;*/
		}
	};
}]);

