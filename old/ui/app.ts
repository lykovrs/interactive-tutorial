var tutorialApp = angular.module('tutorialApp', ['ui.router', 'ui.bootstrap', 'zingchart-angularjs']);

tutorialApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider


    // HOME STATES AND VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })

        .state('teach', {
            url: '/teach',
            template: '<teach></teach>'
        })

        .state('teach.lesson-1', {
            url: '/lesson-1',
            templateUrl: '/lesson-1.html',
            controller: function ($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        .state('test', {
            url: '/test',
            template: '<questions></questions>'

        })

        .state('result', {
            url: '/result',
            template: '<result></result>'

        });

});

// Сервис для обработки данных тестирования
tutorialApp.service('questionsService', function ($http) {

    this.getQuestions = () => {
        return $http.get('data/test.json').then(response => {
            this.questions = response.data;
            console.log("get questions data");

            this.result.all = this.questions.length;

            this.selectedQuestion = this.questions[0];
            console.log("get selection item");

            return response.data;
        });
    };

    // Массив с объектами опросника
    this.questions = [];

    // Объект с результатами тестирования
    this.result = {
        all: 0,
        selected: 0,
        rightAswers: 0,
        notRightAswers: 0
    };

    // Текущий вопрос
    this.selectedQuestion = {};

    // Проверка текущего вопроса
    this.calcResult = (question) => {
        if (question.type == "checkbox") {
            for (let answer of question.answers) {
                if (answer.type !== answer.model) {
                    this.result.notRightAswers++;
                    return;
                }
            }

            this.result.rightAswers++;
        }

        if (question.type == 'radio') {
            if (question.model == question.rightAnswer) {
                this.result.rightAswers++;
            } else {
                this.result.notRightAswers++;
            }
        }


    };

    // Переход к сделующему заданию
    this.getNextQusestion = () => {
        this.calcResult(this.selectedQuestion);
        this.result.selected++;
        this.selectedQuestion = this.questions[this.result.selected];

    };

    // Переход к предыдущему заданию
    this.getPrewQusestion = () => {
        this.calcResult(this.selectedQuestion);
        this.result.selected--;
        this.selectedQuestion = this.questions[this.result.selected];

    };

    this.getResult = () => {
        return this.result;
    }
});

// component'questions'
// tutorialApp.component('result', {




// Сервис процесса обучения
tutorialApp.service('lessonsService', function ($http) {

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

// Компонент страницы обчения
// tutorialApp.component('teach', {
