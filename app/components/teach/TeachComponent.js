// Компонент страницы обчения
angular.module('viewTeach', ['serviceLessons']);
labApp.component('teach', {
    templateUrl: 'components/teach/teach.html',
    controller: function (serviceLessons) {

        serviceLessons.getLessons().then(lessons => {
            this.lessons = serviceLessons.lessons;
        });

    }
});