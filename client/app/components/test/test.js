import angular from 'angular';
import uiRouter from 'angular-ui-router';
import testComponent from './test.component';

let testModule = angular.module('test', [
  uiRouter,
])

  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $stateProvider
      .state('test', {
        url: '/',
        component: 'test'
      });
  })

  .component('test', testComponent)

  .name;

export default testModule;
