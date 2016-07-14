// Компонент страницы обчения
angular.module('mainMenu', []);
labApp.component('mainMenu', {
    templateUrl: 'components/mainMenu/mainMenu.html',
    bindings: {
        items: '='
    },
    controller: function () {
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