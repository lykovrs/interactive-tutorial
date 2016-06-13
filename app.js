// let angular = require ('../bower_components/angular/angular.min');
// var uirouter = require ('../bower_components/angular-ui-router/release/angular-ui-router.min.js');
// var uibootsrap = require ('../bower_components/angular-bootstrap/ui-bootstrap.min.js');
// var uibootsraptpls = require ('../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js');


var routerApp = angular.module('routerApp', ['ui.router', 'ui.bootstrap', 'zingchart-angularjs']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

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
routerApp.service('questionsService', function ($http) {

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

routerApp.component('questions', {
    templateUrl: 'questions.html',
    controller: function (questionsService) {

        questionsService.getQuestions().then(questions => {
            this.selectedQuestion = questionsService.selectedQuestion;
            this.result = questionsService.result;
        });


        this.getNextQusestion = () => {
            questionsService.getNextQusestion();
            this.selectedQuestion = questionsService.selectedQuestion;
            this.result = questionsService.result;
        };

        this.getPrewQusestion = () => {
            questionsService.getPrewQusestion();
            this.selectedQuestion = questionsService.selectedQuestion;
            this.result = questionsService.result;
        };

        this.endTest = () => {
            this.getNextQusestion();
            // this.result = questionsService.result;
            console.log('end');
        }
    }
});


routerApp.component('result', {
    templateUrl: 'result.html',
    controller: function (questionsService) {
        this.result = questionsService.getResult();

        this.myJson = {
            type: 'pie',
            tooltip: {
                text: "Колличество ответов: %v"
            },
            legend: {
                layout: "x5",
                position: "50%",
                borderColor: "transparent",
                marker: {
                    borderRadius: 10,
                    borderColor: "transparent"
                }
            },
            series: [

                {
                    text: 'Верные ответы',
                    values: [this.result.rightAswers]
                },
                {
                    text: 'Ответы с ошибкой',
                    values: [this.result.notRightAswers]
                }
            ]
        };
    }
});


// Сервис процесса обучения
routerApp.service('lessonsService', function ($http) {

    this.getLessons = () => {
        return $http.get('data/pages.json').then(response => {
            this.lessons = response.data;
            console.log("get lessons data");
            return response.data;
        });
    };
});

// Компонент страницы обчения
routerApp.component('teach', {
    templateUrl: 'teach.html',
    controller: function (lessonsService) {

        lessonsService.getLessons().then(lessons => {
            this.lessons = lessonsService.lessons;
        });

    }
});