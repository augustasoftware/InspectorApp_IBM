// var db;
angular.module('inspection', ['ionic', 'ng-fx', 'inspection.controllers', 'inspection.Services', 'chart.js', 'ngCordova',"googlechart"])

.run(function($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

        });
    })
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.navBar.alignTitle('center');

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })



        .state('login', {
                url: '/login',
                templateUrl: 'templates/login/login.html',
                controller: 'loginCtrl'

            })
            .state('app.inspection_list', {
                url: '/inspection_list',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/inspection/inspection_list.html',
                        controller: 'inspection_listCtrl'
                    }
                }
            })
            .state('app.inspection_details', {
                url: '/inspection_list/:id',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/inspection/inspection_details.html',
                        controller: 'inspection_detailsCtrl'
                    }
                }
            })
            .state('app.inspection_checklist', {
                url: '/inspection_list/:id/:detailid',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/inspection/inspection_checklist.html',
                        controller: 'inspection_checklistCtrl'
                    }
                }
            })
            .state('report', {
                url: '/report',
                cache:false,
                templateUrl: 'templates/report/report.html',
                controller: 'reportCtrl'
            })
			
			.state('speech', {
                url: '/speech',
                cache:false,
                templateUrl: 'templates/speech/speech.html',
                controller: 'speechCtrl'
            })

        .state('reportbug', {
            url: '/reportbug',
            templateUrl: 'templates/report/bug.html',
            controller: 'reportbugCtrl'
        })

        .state('addincident', {
            url: '/addincident/:pid/:id',
            templateUrl: 'templates/Incident/addincident.html',
            controller: 'addincidentCtrl'
        })


        if (window.localStorage.start == undefined) {
            $urlRouterProvider.otherwise('/login');
            window.localStorage.start="hi";


        } else {


            $urlRouterProvider.otherwise('/app/inspection_list');

        }
    });
