import angular from 'angular';
import ServiceLessons from './lessons/lessons.service';


let servicesModule = angular.module('app.services', [
  ServiceLessons
])

.name;

export default servicesModule;
