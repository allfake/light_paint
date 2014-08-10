'use strict';

describe('Directive: gridPaint', function () {

  // load the directive's module
  beforeEach(module('lightPaintApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<grid-paint></grid-paint>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gridPaint directive');
  }));
});
