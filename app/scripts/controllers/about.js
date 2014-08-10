'use strict';

/**
 * @ngdoc function
 * @name lightPaintApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lightPaintApp
 */
angular.module('lightPaintApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
