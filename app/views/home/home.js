'use strict';

angular.module('labApp.viewHome', ['ui.router'])

labApp.config(function ($stateProvider) {
  $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home/home.html'
      })
});