'use strict';
var fs = require('fs');
var assert = require('assert');

describe('filerev', function () {
  it('should revision files based on content', function () {
    var original = fs.statSync('test/fixtures/file.png').size;
    var revisioned = fs.statSync('test/tmp/file.a0539763.png').size;
    assert(revisioned === original);
  });

  it('should accept options', function () {
    var original = fs.statSync('test/fixtures/cfgfile.png').size;
    var revisioned = fs.statSync('test/tmp/cfgfile.f64f.png').size;
    assert(revisioned === original);
  });

  it('should allow a dest directory option', function () {
    var original = fs.statSync('test/fixtures/file.png').size;
    var revisioned = fs.statSync('test/tmp/dest/file.a0539763.png').size;
    assert(revisioned === original);
  });

  it('should allow sources defined with expand', function () {
    var original = fs.statSync('test/fixtures/file.png').size;
    var revisioned = fs.statSync('test/tmp/expand/file.a0539763.png').size;
    assert(revisioned === original);
  });

  it('should copy the file when copy option is true', function () {
    var original = fs.statSync('test/fixtures/another.png').size;
    var revisioned = fs.statSync('test/tmp/another.37ba.png').size;
    assert(revisioned === original);
    var fileExists = fs.existsSync('test/tmp/another.png');
    assert(fileExists === true);
  });

  it('should move the file when copy option is false', function () {
    var original = fs.statSync('test/fixtures/movedfile.png').size;
    var revisioned = fs.statSync('test/tmp/copyfalse/movedfile.37ba.png').size;
    assert(revisioned === original);
    var fileExists = fs.existsSync('test/tmp/movedfile.png');
    assert(fileExists === false);
  });

  it('should copy the file without copy option when dest is specified', function () {
    var original = fs.statSync('test/fixtures/another.png').size;
    var revisioned = fs.statSync('test/tmp/nocopy/another.37ba.png').size;
    assert(revisioned === original);
    var fileExists = fs.existsSync('test/tmp/another.png');
    assert(fileExists === true);
  });

  it('should move the file without copy option when dest is not specified', function () {
    var original = fs.statSync('test/fixtures/movednocopyfile.png').size;
    var revisioned = fs.statSync('test/tmp/movednocopyfile.37ba.png').size;
    assert(revisioned === original);
    var fileExists = fs.existsSync('test/tmp/movednocopyfile.png');
    assert(fileExists === false);
  });
});
