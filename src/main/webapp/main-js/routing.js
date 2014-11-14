var mainApp = angular.module('mainApp', [ 'ui.router', 'cloudApp' ]);

mainApp.config(function($stateProvider, $urlRouterProvider) {

	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/website/home");
	//
	// Now set up the states
	$stateProvider.state('website', {
		url : "/website",
		templateUrl : "website-partials/baseweb.html"
	}).state('website.about', {
		url : "/about",
		templateUrl : "website-partials/about.html"
	}).state('website.home', {
		url : "/home",
		templateUrl : "website-partials/home.html"
	})
	.state('cloud', {
		url : "/cloud",
		templateUrl : "cloud-partials/baseapp.html"
	}).state('cloud.login', {
		url : "/login",
		templateUrl : "cloud-partials/login.html",
		controller : LoginController
	}).state('cloud.signup', {
		url : "/signup",
		templateUrl : "cloud-partials/signup.html",
		controller : CreateUserController
	}).state('cloud.accountsuccess', {
		url : "/accountsuccess",
		templateUrl : "cloud-partials/accountcreate.html",
		controller : CreateUserController
	}).state('cloud.create', {
		url : "/create",
		templateUrl : "cloud-partials/create.html",
		controller : CreateController
	}).state('cloud.myaccount', {
		url : "/myaccount",
		templateUrl : "cloud-partials/myaccount.html",
		controller : IndexController
	}).state('cloud.edit', {
		url : "/edit/:id",
		templateUrl : "cloud-partials/edit.html",
		controller : EditController
	});
	
});
