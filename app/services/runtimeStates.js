angular.module('serviceRuntimeStates', ['ui.router']);
// config-time dependencies can be injected here at .provider() declaration
labApp.provider('serviceRuntimeStates', function runtimeStates($stateProvider) {
    // runtime dependencies for the service can be injected here, at the provider.$get() function.
    this.$get = function($q, $timeout, $state) { // for example
        return {
            addState: function(name, state) {
                $stateProvider.state(name, state);
                console.log('add state')
            }
        }
    }
});