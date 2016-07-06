'use strict';

angular.module('viewTeach', ['ui.router']);

labApp.config(function ($stateProvider) {
  $stateProvider.state('teach', {
          url: '/teach',
          template: '<teach></teach>'
      })
});