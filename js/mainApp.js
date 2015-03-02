/*
 * Portfolio1: for for Web Design Front-end
 * This is the main JS file
 * features some global and locals functions
 */

// Creating Angular Main Module
salesApp = angular.module('WebSalesManagementApp', ['ngRoute', 'ngResource','highcharts-ng']);

// Templates and Pages Routes
salesApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: './partials/login.html',
        controller: 'loginCtrl'
      }).
      when('/home', {
        templateUrl: './partials/home.html',
        controller: 'salesMainCtrl',
        controller: 'homeCtrl'
      }).
      when('/login',{
      	templateUrl: './partials/login.html',
      	controller: 'loginCtrl'
      }).
      otherwise({
         redirectTo: '/'
      });
}]);

//Login validation. 
//Should not access Home page if user is not logged
salesApp.run(function($rootScope, $location, loginService, sessionService) {
	
	var routespermission=['/home']; // This route requires login before access is allowed
	$rootScope.$on('$routeChangeStart', function(){
		if(routespermission.indexOf($location.path()) !=-1){
			var connected = loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login'); // forced back to login
			});
		}
	});
});

// Services
salesApp.factory('Salesmen', function($resource){
	return $resource ('http://localhost/workspace/SalesManagement/js/salesmen.json', {}, {
		query:{method:'GET', isArray:true}
	});
});
/*
// SessionServices
salesApp.factory('SessionIdService', function() {
    var sessionID = '';
    return {
        getSessionId: function() {
            if(sessionID=='' || sessionID==null)
                sessionID = localStorage.getItem("SessionId");

            console.log("Get sessionId => " + sessionID); 

            return sessionID;
        },
        setSessionId: function(sessId) {
            console.log("Set sessionId=" + sessId);
            localStorage.setItem("SessionId", sessId);
            sessionID = sessId;
            return;
        }
    };
});*/

// Important Controllers
salesApp.controller('salesMainCtrl', ['$scope', 'Salesmen', function($scope, Salesmen){
	$scope.salesmen = Salesmen.query();
	
	// Defining Pie Chart Options for Salesmen Sales Values
	$scope.chartConfig = {
        options: {
            chart: {
                type: 'pie'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>${y}</b>',
                    },
                    showInLegend: true
                }
            },
        },
        
        series: [{
        	type:'pie',
        	name:'Sales Values Per Salesmen',
            data: [
            	['Oswaldo', 4252],
            	['Mao', 1480],
            	['Angeline', 10145],
            	['Gerardo', 1124],
            	['Nicki', 4500]
            ]
        }],
        title: {
            text: 'Sales Values Per Salesmen'
        },

        loading: false
    };
    
    // Defining Bar/Column Chart Options for Monthly Sales
	$scope.chartConfig2 = {
        options: {
            chart: {
                type: 'column'
            },
             plotOptions: {
	            series: {
	                dataLabels: {
	                    enabled: true,
	                    format: '$ {y}'
	                }
	            }
	         },
        },
        series: [{
        	type: 'column',
        	name: 'Monthly Sales',
            data: [
            	['Jan',10024], 
            	['Feb', 1135],
            	['Mar', 1223],
            	['Apr', 23545],
            	['Mai', 4327],
            	['Jun', 1849], 
            	['July', 5513],
            	['Aug', 4252],
            	['Sep', 1480],
            	['Oct', 10145],
            	['Nov', 1124],
            	['Dec', 4500]
            ]
        }],
        title: {
            text: 'Monthly Sales'
        },
         xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        loading: false
    };
	
}]);
