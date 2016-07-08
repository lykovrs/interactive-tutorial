// Компонент страницы обчения
angular.module('viewTeach', ['serviceLessons', 'ui.router']);
labApp.component('teach', {
    templateUrl: 'components/teach/teach.html',
    bindings: {
        lesson: '='
    },
    controller: function (serviceLessons) {

        serviceLessons.getLessons().then(lessons => {

            if(this.lesson){
                this.title = this.lesson.title || 'testTitle';

            }


        });

    }

});