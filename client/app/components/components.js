import angular from 'angular';
import Home from './home/home';
import Test from './test/test';
import Tutorial from './tutorial/tutorial';

let componentModule = angular.module('app.components', [
  Home,
  Test,
  Tutorial
])

.name;

export default componentModule;
