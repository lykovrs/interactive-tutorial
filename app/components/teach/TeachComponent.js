// Компонент страницы обчения
angular.module('viewTeach', ['serviceLessons', 'ui.router']);
labApp.component('teach', {
    templateUrl: 'components/teach/teach.html',
    controller: function (serviceLessons) {

        serviceLessons.getLessons().then(lessons => {
            this.lessons = serviceLessons.lessons;


                    angular.forEach(serviceLessons.lessons, function(value, key) {

                        // here we ask if there is a state with the same name
                        var getExistingState = $state.get(value.name)

                        // no need to continue, there is state (e.g. login) already
                        if(getExistingState !== null){
                            return;
                        }

                        var state = {
                            "url": value.url,
                            "parent": value.parent,
                            "abstract": value.abstract,
                            "views": {}
                        };

                        angular.forEach(value.views, function(view) {
                            state.views[view.name] = {
                                templateUrl: view.templateUrl,
                            };
                        });

                        $stateProviderRef.state(value.name, state);
                    });
                    // Configures $urlRouter's listener *after* your custom listener

                    $urlRouter.sync();
                    $urlRouter.listen();


        });

    }
});