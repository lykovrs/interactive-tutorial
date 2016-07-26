// Компонент страницы обчения
angular.module('viewTeach', ['serviceLessons', 'sidebarMenu']);
labApp.component('teach', {
    templateUrl: 'components/teach/teach.html',

    controller: function ($state, serviceLessons) {
        this.lesson = serviceLessons.getLesson($state.current.name);
       // console.log($state.current);

        this.lessons = serviceLessons.getAllLessons();
        // console.log(this.lessons);
    }
});