// Компонент страницы обчения
angular.module('mainPage', ['serviceLessons']);
labApp.component('mainPage', {
    templateUrl: 'components/mainPage/mainPage.html',
    bindings: {
       
    },
    controller: function (serviceLessons) {
        console.log('main page load');

        serviceLessons.getStateLessons();

        // this.lesson = serviceLessons.getLessons();
        // if(this.lesson) {
        //     console.log(this.lesson)
        // } else {
        //     console.log('not lesson')
        // }
        // console.log(this.lesson)
        //     this.title =  this.lesson.title  || 'testTitle';
            // this.lesson = lesson;


    }
});