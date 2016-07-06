'use strict';

angular.module('viewHome', ['ui.router']);

labApp.config(function ($stateProvider) {
  $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home/home.html'
      })
});