angular
		.module('cloudApp', [ 'ngCookies', 'cloudApp.services', 'charts', 'charts.controllers' ])
		.config(
				[
						'$locationProvider',
						'$httpProvider',
						function($locationProvider, $httpProvider) {

							/*
							 * Register error provider that shows message on
							 * failed requests or redirects to login page on
							 * unauthenticated requests
							 */
							$httpProvider.interceptors.push(function($q,
									$rootScope, $location) {
								return {
									'responseError' : function(rejection) {
										var status = rejection.status;
										var config = rejection.config;
										var method = config.method;
										var url = config.url;

										if (status == 401) {
											$location.path("cloud/login");
										} else {
											$rootScope.error = method + " on "
													+ url
													+ " failed with status "
													+ status;
										}

										return $q.reject(rejection);
									}
								};
							});

							/*
							 * Registers auth token interceptor, auth token is
							 * either passed by header or by query parameter as
							 * soon as there is an authenticated user
							 */
							$httpProvider.interceptors
									.push(function($q, $rootScope, $location) {
										return {
											'request' : function(config) {
												var isRestCall = config.url
														.indexOf('rest') == 0;
												if (isRestCall
														&& angular
																.isDefined($rootScope.authToken)) {
													var authToken = $rootScope.authToken;
													if (cloudAppConfig.useAuthTokenHeader) {
														config.headers['X-Auth-Token'] = authToken;
													} else {
														config.url = config.url
																+ "?token="
																+ authToken;
													}
												}
												return config
														|| $q.when(config);
												
												
											}
										};
									});

						} ]

		).run(function($rootScope, $location, $cookieStore, AuthService, UserService) {

			/* Reset error when a new view is loaded */
			$rootScope.$on('$viewContentLoaded', function() {
				delete $rootScope.error;
			});

			$rootScope.hasRole = function(role) {

				if ($rootScope.user === undefined) {
					return false;
				}

				if ($rootScope.user.roles[role] === undefined) {
					return false;
				}

				return $rootScope.user.roles[role];
			};

			$rootScope.logout = function() {
				delete $rootScope.user;
				delete $rootScope.authToken;
				$cookieStore.remove('authToken');
				$location.path("cloud/login");
			};

			/* Try getting valid user from cookie or go to login page */
			var originalPath = $location.path();
			console.log(originalPath);
			if ($location.path().indexOf("signup") == 0) {
				$location.path("cloud/login");
			}

			if ($location.path().indexOf("accountsuccess") == 0) {
				$location.path("cloud/login");
			}
			var authToken = $cookieStore.get('authToken');
			if (authToken !== undefined) {
				$rootScope.authToken = authToken;
				UserService.get(function(user) {
					$rootScope.user = user;
					$location.path(originalPath);
				});
			}

			$rootScope.initialized = true;
		});

function IndexController($scope, NewsService) {

	$scope.newsEntries = NewsService.query();

	$scope.deleteEntry = function(newsEntry) {
		newsEntry.$remove(function() {
			$scope.newsEntries = NewsService.query();
		});
	};
};

function EditController($scope, $routeParams, $location, NewsService) {

	$scope.newsEntry = NewsService.get({
		id : $routeParams.id
	});

	$scope.save = function() {
		$scope.newsEntry.$save(function() {
			$location.path('cloud/myaccount');
		});
	};
};

function CreateController($scope, $location, NewsService) {

	$scope.newsEntry = new NewsService();

	$scope.save = function() {
		$scope.newsEntry.$save(function() {
			$location.path('cloud/myaccount');
		});
	};
};
function CleanSignupValidation($scope)
{
	 $scope.requireName=false;
	 $scope.requireLast=false;
	 $scope.requireCompany=false;
	 $scope.requirePhone=false;
	 $scope.requireEmail=false;
	 $scope.errorEmail=false;
	 $scope.requireUsername=false;
	 $scope.requirePassword=false;
	 $scope.errorPassword=false;
	 $scope.errorRetypepwd=false;
	 $scope.requireRetypepwd=false;
}
function CheckSignupValidity($scope)
{
	CleanSignupValidation($scope);
	 var allSet=true;
	if($scope.user.firstName==undefined)
	{
	   $scope.requireName=true;
	   allSet=false;
	}
    if($scope.user.lastName==undefined)
    {
       $scope.requireLast=true;
       allSet=false;
    }
    if($scope.user.tenantId==undefined)
    {
       $scope.requireCompany=true;
       allSet=false;
    }
    if($scope.user.phone==undefined)
    {
       $scope.requirePhone=true;
       allSet=false;
    }
    if($scope.user.email==undefined)
    {
    	$scope.errorEmail=true;
    	allSet=false;
    }
   // else
    //{
    //	passRegEx = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*([a-zA-Z0-9-]+)?@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
	//	alert( passRegEx.test($scope.user.email));
    //}
    if($scope.user.username==undefined)
    {
       $scope.requireUsername=true;
       allSet=false;
    }
    if($scope.user.password==undefined)
    {
       $scope.requirePassword=true;
       allSet=false;
    }
    else
    	{
    	if($scope.user.password.length<6)
    		{
    		$scope.errorPassword=true;
    		allSet=false;
    		}
    	}
    if($scope.retry==undefined)
    {
       $scope.requireRetypepwd=true;
       allSet=false;
    }
    if($scope.user.password!==$scope.retry&&$scope.user.password!==undefined)
    {
    	 $scope.requireRetypepwd=false;
    	 $scope.errorRetypepwd=true;
    	 allSet=false;
    }
    return allSet;
}

function CleanLoginValidation($scope)
{
	 
	 $scope.requireUsername=false;
	 $scope.requirePassword=false;

}
function CheckLoginValidity($scope)
{
	CleanLoginValidation($scope);
	
	var allSet=true;

    if($scope.username==undefined||$scope.username=="")
    {
       $scope.requireUsername=true;
       allSet=false;
    }
    if($scope.password==undefined||$scope.password=="")
    {
       $scope.requirePassword=true;
       allSet=false;
    }

    return allSet;
}
function CreateUserController($scope, $location, UserService) {

	$scope.user = new UserService();

	$scope.signup = function() {

	var isValidate=	CheckSignupValidity(this);
	
	 if(isValidate)
		 {
		$scope.user.$save(function() {
			$location.path('cloud/accountsuccess');
		   });
		 }
	};
};

function LoginController($scope, $rootScope, $location, $cookieStore, $q,
		AuthService, UserService) {

	$scope.rememberMe = false;

	$scope.auth = new AuthService();

	$scope.login = function() {
		
		var isValidate=	CheckLoginValidity(this);
		
		$scope.errorLogin = false;
	
		if(isValidate)
		 {
					var authResponse = AuthService.authenticate($.param({
						username : $scope.username,
						password : $scope.password
					}));
					console.log(authResponse);
					authResponse.$promise
					.then(function(authenticationResult){
						
						var authToken = authenticationResult.token;
						
						if (authToken != null) {
							$scope.errorLogin = false;
						}
						
						$rootScope.authToken = authToken;
						if ($scope.rememberMe) {
							$cookieStore.put('authToken', authToken);
						}
						UserService.get(function(user) {
						
							$rootScope.user = user;
							$location.path('cloud/myaccount');
						});
						
					 })
					.catch(function(err){
						
						console.log(err.status);
						
						if(err.status=="401"){
 
						$scope.errorLogin = true;
						}
					});			   		
	  }
	};
};

var services = angular.module('cloudApp.services', [ 'ngResource' ]);

services.factory('AuthService', function($resource) {

	return $resource('rest/auth/:action', {}, {
		authenticate : {
			method : 'POST',
			params : {
				'action' : 'authenticate'
			},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		},
	});
});

services.factory('UserService', function($resource) {

	return $resource('rest/user/:id', {
		id : '@id'
	});

});

services.factory('NewsService', function($resource) {

	return $resource('rest/news/:id', {
		id : '@id'
	});
});