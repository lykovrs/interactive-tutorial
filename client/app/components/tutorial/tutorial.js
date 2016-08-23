import angular from 'angular';
import uiRouter from 'angular-ui-router';
import tutorialComponent from './tutorial.component';

let tutorialModule = angular.module('tutorial', [
  uiRouter,
])

  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $stateProvider
      .state('tutorial', {
        url: '/tutorial',
        component: 'tutorial'
      });
  })

  .component('tutorial', tutorialComponent)

  .name;

export default tutorialModule;
