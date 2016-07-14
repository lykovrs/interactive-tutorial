'use strict';

// Declare app level module which depends on views, and components
var labApp = angular.module('labApp', [
  'ui.router',
  'ui.bootstrap',

  'viewHome',
  'mainPage',

]);
// var labApp = angular.module('labApp', [
//   'ui.router',
//   'ui.bootstrap',
//   'serviceLessons',
//   'viewHome',
//   'viewTeach',
//   'sidebarMenu',
//   'serviceRuntimeStates'
//
// ]);

labApp.config(function ($urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');  

});

// angular.module('labApp', [
//   'ui.router',
//   'ui.bootstrap',
//   'labApp.view1',
//   'labApp.view2',
//   'labApp.version'
// ]).
// config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
//   $locationProvider.hashPrefix('!');
//
//   $routeProvider.otherwise({redirectTo: '/view1'});
// }]);
