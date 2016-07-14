// Компонент страницы обчения
angular.module('viewTeach', []);
labApp.component('teach', {
    templateUrl: 'components/teach/teach.html',
    bindings: {
        lesson: '='
    },
    controller: function () {
        this.lesson = serviceLessons.getLessons();
        if(this.lesson) {
            console.log(this.lesson)
        } else {
            console.log('not lesson')
        }
        // console.log(this.lesson)
        //     this.title =  this.lesson.title  || 'testTitle';
            // this.lesson = lesson;


    }
});