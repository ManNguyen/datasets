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
  'mol.api',
  'mol.facets',
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

  // set some available url params
  // dt = Data types. E.g. Expert Range Maps (range)
  // sg = Species groups. E.g. Birds (birds)
  // regiontype = Region types. E.g. mountains
  // region = Region name. E.g. Alps
  // regionid = Region ID. E.g. f105d536-8347-4b8e-bec4-627d20a53efa
  var params = "embed&sidebar&header&subnav&footer" + // ui mode options
  "&regiontype&region&regionid" + // selected dataset region options
  "&dt&sg"; // selected dataset options
    
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = false;
  $locationProvider.html5Mode(true);
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http:*//localhost**',
    'http*://127.0.0.1:9001/**',
    'http*://*mol.org/**',
    'http*://api.mol.org/1.0/datasets/**',
    'http*://api.mol.org/0.x/datasets/**',
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
      'datasets.regions', {
        title: 'Datasets by region',
        views: {
          '': {
            templateUrl: 'static/app/views/regions.html'
          }
        },
        url: '/regions?{0}'.format(params)
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
        url: '/?{0}'.format(params)
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
        url: 'map?{0}'.format(params)
      }
    )
    .state(
      'datasets.all.list', {
        views: {
          'info-pane@datasets.all': {
            templateUrl: 'static/app/views/table/main.html'
          }
        },
        url: 'list?{0}'.format(params)
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
        url: '?{0}'.format(params)
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
        url: '/:dataset?{0}'.format(params)
      }
    )
    .state(
      'datasets.info.map', {
        views: {
          'title@datasets.info': {
            templateUrl: 'static/app/views/info/title.html',
            controller: 'molDatasetsInfoCtrl'
          },
          'map@datasets.info': {
            templateUrl: 'static/app/views/map/main.html',
            controller: 'molDatasetsMapCtrl'
          },
        },
        url: '/map?{0}'.format(params)
      }
    )
    .state(
      'datasets.info.info', {
        views: {
          'title@datasets.info': {
            templateUrl: 'static/app/views/info/title.html',
            controller: 'molDatasetsInfoCtrl'
          },
          'info-pane@datasets.info': {
            templateUrl: 'static/app/views/info/info.html',
            controller: 'molDatasetsInfoCtrl'
          }
        },
        url: '/info?{0}'.format(params)
      }
    )
    .state(
      'datasets.info.both', {
        views: {
          'title@datasets.info': {
            templateUrl: 'static/app/views/info/title.html',
            controller: 'molDatasetsInfoCtrl'
          },
          'map@datasets.info': {
            templateUrl: 'static/app/views/map/main.html',
            controller: 'molDatasetsMapCtrl'
          },
          'info-pane@datasets.info': {
            templateUrl: 'static/app/views/info/info.html',
            controller: 'molDatasetsInfoCtrl'
          }
        },
        url: '?{0}'.format(params)
      }
    );
    $locationProvider.html5Mode(true);
}])
