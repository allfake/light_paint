'use strict';

/**
 * @ngdoc function
 * @name lightPaintApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lightPaintApp
 */
angular.module('lightPaintApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
