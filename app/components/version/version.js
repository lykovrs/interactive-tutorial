'use strict';

angular.module('labApp.version', [
  'labApp.version.interpolate-filter',
  'labApp.version.version-directive'
])

.value('version', '0.1');
