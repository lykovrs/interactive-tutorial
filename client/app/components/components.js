import angular from 'angular';
import Home from './home/home';
import Test from './test/test';

let componentModule = angular.module('app.components', [
  Home,
  Test
])

.name;

export default componentModule;
