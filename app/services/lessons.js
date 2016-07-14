// Сервис процесса обучения
angular.module('serviceLessons', ['serviceRuntimeStates']);
labApp.service('serviceLessons', function ($http, serviceRuntimeStates) {

    this.lessons = $http.get('data/pages.json').then(response => {
        // Получаем данные из файла
        this.lessons = response.data;
        console.log("get lessons data");


        // Динамически формируем состояния роутера и пробрасываем данные и вотчим состояние обекта
        angular.forEach(this.lessons, function(lesson, lessonKey) {
            // console.log(lessonKey + ': ' + lesson.url);
            

            serviceRuntimeStates.addState(lesson.url,{
                url: `/${lesson.url}`,
                template: `<teach lesson="${lessonKey}"></teach>`
            });
        });

        return response.data;
    });



    this.getLessons = (key) => {
        return this.result[key];
    };

});
