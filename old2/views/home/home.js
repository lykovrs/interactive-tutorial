'use strict';

angular.module('viewHome', ['ui.router' , 'mainPage']);

labApp.config(function ($stateProvider) {
  $stateProvider.state('home', {
        url: '/home',
        template: '<main-page></main-page>'
      })
});