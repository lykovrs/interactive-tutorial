// Сервис процесса обучения
angular.module('serviceLessons', ['serviceRuntimeStates']);
labApp.service('serviceLessons', function ($http, serviceRuntimeStates ) {
    let bunchKeys = {};
    this.lessons = null;
    this.getStateLessons = () => {
        if(!this.lessons){
            this.lessons = $http.get('data/pages.json').then(response => {
                // Получаем данные из файла
                this.lessons = response.data;
                console.log("get lessons data");

                // Динамически формируем состояния роутера и пробрасываем данные и вотчим состояние обекта

                angular.forEach(this.lessons, function(lesson, lessonKey) {
                    console.log(lessonKey + ': ' + lesson.url);
                    bunchKeys[lesson.url] = lessonKey;

                    serviceRuntimeStates.addState(lesson.url,{
                        url: `/${lesson.url}`,
                        template: `<teach></teach>`
                    });
                });
                console.log('add states of lessons');
            });
        }

    };

    this.getLesson = (key) => {
        console.log(bunchKeys)
        return this.lessons[bunchKeys[key]];
    };

    this.getAllLessons = () => {
        return this.lessons;
    };

});
