'use strict';

// Declare app level module which depends on views, and components
var labApp = angular.module('labApp', [
  'ui.router',
  'ui.bootstrap',
  'viewHome',
  'mainPage',
  'serviceLessons',
  'sidebarMenu',
  'viewTeach'


]);

labApp.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
});
