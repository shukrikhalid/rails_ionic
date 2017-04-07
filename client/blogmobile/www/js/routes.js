angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.list', {
    cache: false,
    url: '/list',
    views: {
      'side-menu21': {
        templateUrl: 'templates/list.html',
        controller: 'listCtrl'
      }
    }
  })

  .state('menu.addNew', {
    url: '/addnew',
    views: {
      'side-menu21': {
        templateUrl: 'templates/addNew.html',
        controller: 'addNewCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu.detail', {
    url: '/detail/:id',
    views: {
      'side-menu21': {
      templateUrl: 'templates/detail.html',
      controller: 'detailCtrl'
        }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/list')

  

});