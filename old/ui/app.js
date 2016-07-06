var tutorialApp = angular.module('tutorialApp', ['ui.router', 'ui.bootstrap', 'zingchart-angularjs']);
tutorialApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
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
    var _this = this;
    this.getQuestions = function () {
        return $http.get('data/test.json').then(function (response) {
            _this.questions = response.data;
            console.log("get questions data");
            _this.result.all = _this.questions.length;
            _this.selectedQuestion = _this.questions[0];
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
    this.calcResult = function (question) {
        if (question.type == "checkbox") {
            for (var _i = 0, _a = question.answers; _i < _a.length; _i++) {
                var answer = _a[_i];
                if (answer.type !== answer.model) {
                    _this.result.notRightAswers++;
                    return;
                }
            }
            _this.result.rightAswers++;
        }
        if (question.type == 'radio') {
            if (question.model == question.rightAnswer) {
                _this.result.rightAswers++;
            }
            else {
                _this.result.notRightAswers++;
            }
        }
    };
    // Переход к сделующему заданию
    this.getNextQusestion = function () {
        _this.calcResult(_this.selectedQuestion);
        _this.result.selected++;
        _this.selectedQuestion = _this.questions[_this.result.selected];
    };
    // Переход к предыдущему заданию
    this.getPrewQusestion = function () {
        _this.calcResult(_this.selectedQuestion);
        _this.result.selected--;
        _this.selectedQuestion = _this.questions[_this.result.selected];
    };
    this.getResult = function () {
        return _this.result;
    };
});
// component'questions'
// tutorialApp.component('result', {
// Компонент страницы обчения
// tutorialApp.component('teach', {
/// <reference path="../../libs/tsd.d.ts" />
/**
 * @module Core
 */
var Core;
(function (Core) {
    /**
     * @module UI
     */
    var UI;
    (function (UI) {
        /**
         * Чекбокс
         * @class Checkbox
         */
        var Checkbox = (function () {
            function Checkbox(model, label, name, disabled, onChange, indeterminate) {
                this.model = model;
                this.label = label;
                this.name = name;
                this.disabled = disabled;
                this.onChange = onChange;
                this.indeterminate = indeterminate;
            }
            return Checkbox;
        }());
        UI.Checkbox = Checkbox;
    })(UI = Core.UI || (Core.UI = {}));
})(Core || (Core = {}));
/// <reference path="../../libs/tsd.d.ts" />
/// <reference path="../../utils/IAppRootScope.ts" />
/// <reference path="../../app/AppConstant.ts" />
/// <reference path="Checkbox.ts" />
/**
 * @module Core
 */
var Core;
(function (Core) {
    /**
     * @module UI
     */
    var UI;
    (function (UI) {
        /**
         * Директива для кастомизации чекбокса
         * @class Checkbox
         * @directive checkbox
         */
        function CheckboxDirective(ConfigStorageService) {
            return {
                restrict: 'EA',
                replace: 'true',
                templateUrl: ConfigStorageService.getConfig().getContentURL() + '/checkbox/checkbox.html',
                require: '^ngModel',
                scope: {
                    model: '=ngModel',
                    label: '=',
                    name: '@',
                    onChange: '=?ngChange',
                    disabled: '=?ngDisabled',
                    indeterminate: '='
                },
                link: function (scope, element, attrs, ngCtrl) {
                    if (attrs.indeterminate) {
                        element.find('input').prop('indeterminate', function () {
                            var indeterminate = scope.indeterminate;
                            return indeterminate && indeterminate.displayed > 0 && indeterminate.displayed < indeterminate.total;
                        });
                    }
                }
            };
        }
        UI.CheckboxDirective = CheckboxDirective;
    })(UI = Core.UI || (Core.UI = {}));
})(Core || (Core = {}));
angular.module(Core.App.AppConstant.ANGULAR_MODULE_NAME).directive('checkbox', ['ConfigStorageService', Core.UI.CheckboxDirective]);
/**
 * @module Core
 */
var Core;
(function (Core) {
    /**
     * @module UI
     */
    var UI;
    (function (UI) {
        /**
         * Компонент страницы вопросов
         * @class Questions
         * @component questions
         */
        var QuestionsComponent = (function () {
            function QuestionsComponent() {
            }
            return QuestionsComponent;
        }());
        UI.QuestionsComponent = QuestionsComponent;
    })(UI = Core.UI || (Core.UI = {}));
})(Core || (Core = {}));
tutorialApp.component('questions', {
    templateUrl: 'questions.html',
    controller: function (questionsService) {
        var _this = this;
        questionsService.getQuestions().then(function (questions) {
            _this.selectedQuestion = questionsService.selectedQuestion;
            _this.result = questionsService.result;
        });
        this.getNextQusestion = function () {
            questionsService.getNextQusestion();
            _this.selectedQuestion = questionsService.selectedQuestion;
            _this.result = questionsService.result;
        };
        this.getPrewQusestion = function () {
            questionsService.getPrewQusestion();
            _this.selectedQuestion = questionsService.selectedQuestion;
            _this.result = questionsService.result;
        };
        this.endTest = function () {
            _this.getNextQusestion();
            // this.result = questionsService.result;
            console.log('end');
        };
    }
});
tutorialApp.component('result', {
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
// Компонент страницы обчения
tutorialApp.component('teach', {
    templateUrl: 'teach.html',
    controller: function (lessonsService) {
        var _this = this;
        lessonsService.getLessons().then(function (lessons) {
            _this.lessons = lessonsService.lessons;
        });
    }
});
//# sourceMappingURL=app.js.map