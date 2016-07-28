/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let app = __webpack_require__(1);
	let home = __webpack_require__(2);
	let MainPageComponent = __webpack_require__(3);
	let MainMenuComponent = __webpack_require__(4);
	let runtimeStates = __webpack_require__(5);
	let lessons = __webpack_require__(6);
	let sidebarMenuComponent = __webpack_require__(7);
	let TeachComponent = __webpack_require__(8);











/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	// Declare app level module which depends on views, and components
	var labApp = angular.module('labApp', [
	  'ui.router',
	  'ui.bootstrap',
	  'viewHome',
	  'mainPage',
	  'serviceLessons',
	  'sidebarMenu',
	  'viewTeach'


	]);

	labApp.config(function ($urlRouterProvider) {
	  $urlRouterProvider.otherwise('/home');
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	angular.module('viewHome', ['ui.router' , 'mainPage']);

	labApp.config(function ($stateProvider) {
	  $stateProvider.state('home', {
	        url: '/home',
	        template: '<main-page></main-page>'
	      })
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports) {

	angular.module('serviceRuntimeStates', ['ui.router']);
	// config-time dependencies can be injected here at .provider() declaration
	labApp.provider('serviceRuntimeStates', function runtimeStates($stateProvider) {
	    // runtime dependencies for the service can be injected here, at the provider.$get() function.
	    this.$get = function($q, $timeout, $state) { // for example
	        return {
	            addState: function(name, state) {
	                $stateProvider.state(name, state);
	                console.log('add state')
	            }
	        }
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports) {

	
	// Компонент бокового меню
	angular.module('sidebarMenu', []);
	labApp.component("sidebarMenu", {
	        restrict: "E",
	        bindings: {
	            items: '='
	        },
	        templateUrl: 'components/sidebarMenu/sidebarMenu.html'
	        ,
	        controller: function ($state) {
	            console.log(this.items )
	            // this.items = [1,2,3]
	            this.isActive = () => {
	                return $state.current.name;
	            };

	            this.goToRoat = (url) => {
	                event.preventDefault();
	                $state.go(url);
	            }
	        }
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	// Компонент страницы обчения
	angular.module('viewTeach', ['serviceLessons', 'sidebarMenu']);
	labApp.component('teach', {
	    templateUrl: 'components/teach/teach.html',

	    controller: function ($state, serviceLessons) {
	        this.lesson = serviceLessons.getLesson($state.current.name);
	       // console.log($state.current);

	        this.lessons = serviceLessons.getAllLessons();
	        // console.log(this.lessons);
	    }
	});

/***/ }
/******/ ]);