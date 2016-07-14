'use strict';

angular.module('viewTeach', ['ui.router', 'serviceRuntimeStates']);

labApp.config(function ($stateProvider) {
  $stateProvider.state('teach', {
          url: '/teach',
          template: '<teach lesson="serviceRuntimeStates.getLesson()"></teach>'
      })
});