// Сервис процесса обучения
angular.module('serviceLessons', []);
labApp.service('serviceLessons', function ($http) {

    this.getLessons = () => {
        return $http.get('data/pages.json').then(response => {
            this.lessons = response.data;
            console.log("get lessons data");

            getTree();
            return response.data;
        });
    };


    // Рекурсивно обходим последовательность страниц, формируем массив
    function getTree() {
        let tree = {};
        console.log('tree')
        return tree;
    };


    this.getTree = (arr) => {

    };

    // Формируем данные для навигации

    // Формируем данные для компиляции страниц и урлов
});
