'use strict';

angular.module('mol.controllers',[]);

angular.module('mol.datasets', [
  'ui.router',
  'ui-leaflet',
  'angular-loading-bar',
  'angular.filter',
  'ngResource',
  'ngSanitize',
  'ngCookies',
  'ngAnimate',
  'ui.bootstrap',
  'mol.facets',
  'mol.api',
  'mol.services',
  'mol.loading-indicator',
  'mol.controllers'
])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.includeBar = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
  }])
.config(['$httpProvider', '$locationProvider', '$sceDelegateProvider', '$urlRouterProvider', '$stateProvider',
            function($httpProvider, $locationProvider, $sceDelegateProvider, $urlRouterProvider, $stateProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
  $locationProvider.html5Mode(true);
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http:*//localhost**',
    'http*://127.0.0.1:9001/**',
    'http*://*mol.org/**',
    'http://mol.org',
    'https://mol.org',
    'http*://api.mol.org/1.0/datasets/**',
    'http*://api.mol.org/1.0/datasets/**',
    'http*://mapoflife.github.io/**',
  ]);
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state(
      'datasets', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'static/app/layouts/base.html',
            controller: 'molDatasetsCtrl'
          }
        }
      }
    )
    .state(
      'datasets.all', {
        abstract: true,
        title: 'Datasets Info',
        views: {
          '': {
            templateUrl: 'static/app/layouts/sidebar.html'
          },
          'sidebar@datasets.all': {
            templateUrl: 'static/app/views/sidebar.html'
          },
          'content@datasets.all': {
            templateUrl: 'static/app/layouts/content.html'
          }
        },
        url: '/'
      }
    )
    .state(
      'datasets.all.map', {
        views: {
          'map@datasets.all': {
            templateUrl: 'static/app/views/map/main.html',
            controller: 'molDatasetsMapCtrl'
          }
        },
        url: 'map'
      }
    )
    .state(
      'datasets.all.list', {
        views: {
          'info-pane@datasets.all': {
            templateUrl: 'static/app/views/table/main.html'
          }
        },
        url: 'list'
      }
    )
    .state(
      'datasets.all.both', {
        views: {
          'map@datasets.all': {
            templateUrl: 'static/app/views/map/main.html',
            controller: 'molDatasetsMapCtrl'
          },
          'info-pane@datasets.all': {
            templateUrl: 'static/app/views/table/main.html'
          }
        },
        url: ''
      }
    )
    .state(
      'datasets.info', {
        abstract: true,
        title: 'Dataset Info',
        views: {
          '': {
            templateUrl: 'static/app/layouts/basic.html'
          },
          'content@datasets.info': {
            templateUrl: 'static/app/layouts/content.html'
          },
        },
        url: '/:dataset'
      }
    )
    .state(
      'datasets.info.map', {
        views: {
          'map@datasets.info': {
            templateUrl: 'static/app/views/map/main.html',
            controller: 'molDatasetsMapCtrl'
          },
        },
        url: '/map'
      }
    )
    .state(
      'datasets.info.info', {
        views: {
          'info-pane@datasets.info': {
            templateUrl: 'static/app/views/info/info.html',
            controller: 'molDatasetsInfoCtrl'
          }
        },
        url: '/info'
      }
    )
    .state(
      'datasets.info.both', {
        views: {
          'map@datasets.info': {
            templateUrl: 'static/app/views/map/main.html',
            controller: 'molDatasetsMapCtrl'
          },
          'info-pane@datasets.info': {
            templateUrl: 'static/app/views/info/info.html',
            controller: 'molDatasetsInfoCtrl'
          }
        },
        url: ''
      }
    );
    $locationProvider.html5Mode(true);
}])
