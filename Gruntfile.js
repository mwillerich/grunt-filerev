'use strict';
var assert = require('assert');
var path = require('path');

module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'lib/*.js',
        'tasks/*.js',
        'test/**/*.js',
        '!test/tmp/*'
      ]
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      all: {
        src: ['<%= jshint.all %>']
      }
    },

    copy: {
      test: {
        flatten: true,
        expand: true,
        src: ['test/fixtures/*.png'],
        dest: 'test/tmp/'
      }
    },
    filerev: {
      compile: {
        src: ['test/tmp/file.png']
      },
      withConfig: {
        options: {
          algorithm: 'sha1',
          length: 4
        },
        src: ['test/tmp/cfgfile.png']
      },
      withDest: {
        src: ['test/fixtures/file.png'],
        dest: 'test/tmp/dest'
      },
      withExpand: {
        expand: true,
        cwd: 'test/fixtures',
        src: ['*'],
        dest: 'test/tmp/expand'
      },
      withFilenameProcessing: {
        options: {
          process: function (name, hash, ext) {
            return name + '-processed-' + hash + '.' + ext;
          }
        },
        src: ['test/fixtures/another.png'],
        dest: 'test/tmp'
      },
      withSummaryAttributeName: {
        options: {
          summary: 'foo'
        },
        src: ['test/fixtures/file.png', 'test/fixtures/another.png'],
        dest: 'test/tmp'
      },
      withSourceMaps: {
        expand: true,
        cwd: 'test/fixtures',
        src: ['*.js', '*.css'],
        dest: 'test/tmp/withSourceMaps'
      },
      withCopyTrue: {
        options: {
          algorithm: 'sha1',
          length: 4,
          copy: 1
        },
        src: ['test/tmp/another.png'],
        dest: 'test/tmp'
      },
      withCopyFalse: {
        options: {
          algorithm: 'sha1',
          length: 4,
          copy: 0
        },
        src: ['test/tmp/movedfile.png'],
        dest: 'test/tmp/copyfalse'
      },
      withCopyNullDest: {
        options: {
          algorithm: 'sha1',
          length: 4
        },
        src: ['test/tmp/another.png'],
        dest: 'test/tmp/nocopy'
      },
      withCopyNullNoDest: {
        options: {
          algorithm: 'sha1',
          length: 4
        },
        src: ['test/tmp/movednocopyfile.png']
      }
    },
    simplemocha: {
      test: {
        src: 'test/*.js'
      }
    },
    clean: {
      test: ['test/tmp']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', [
    'jshint',
    'jscs',
    'clean',
    'copy',
    'filerev',
    'checkSummary',
    'simplemocha',
    'clean'
  ]);

  grunt.registerTask('checkSummary', 'Check that summary attribute is correctly created', function () {
    var src = path.normalize('test/fixtures/file.png');
    var expected = path.normalize('test/tmp/file.26365248.png');
    assert.equal(grunt.filerev.summary[src], expected);
  });
};
