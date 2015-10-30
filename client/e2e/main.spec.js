'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./main.po');
  });

  it('should include correct data', function() {
    expect(page.h1El.getText()).toBe('\'Allo, \'Allo!');

  });

  it('should list Topics', function () {
    expect(page.topics.count()).toBeGreaterThan(0);
  });

});
