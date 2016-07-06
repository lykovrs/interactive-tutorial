// Компонент страницы обчения
tutorialApp.component('teach', {
    templateUrl: 'teach.html',
    controller: function (lessonsService) {

        lessonsService.getLessons().then(lessons => {
            this.lessons = lessonsService.lessons;
        });

    }
});