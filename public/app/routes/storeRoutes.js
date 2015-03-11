angular.module('storeRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

  $routeProvider

  .when('/', {
    templateUrl:  'app/views/pages/productslist.html',
    controller:   'storeController',
    controllerAs: 'store'
  })

  .when('/shoppingcart', {
    templateUrl:  'app/views/pages/shoppingcart.html',
    controller:   'storeController',
    controllerAs: 'store'
  });

  $locationProvider.html5Mode(true);

});
