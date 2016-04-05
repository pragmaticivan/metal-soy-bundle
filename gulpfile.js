'use strict';

var concat = require('gulp-concat');
var footer = require('gulp-footer');
var gulp = require('gulp');
var header = require('gulp-header');
var runSequence = require('run-sequence');
var minify = require('gulp-minify');
var replace = require('gulp-replace');

gulp.task('build', function() {
  return gulp.src('manuallyBuiltDeps.js')
    .pipe(concat('bundle.js'))
    .pipe(replace('var goog = goog || {};', 'var goog = this.goog || {};'))
    .pipe(header('(function() {\nthis.CLOSURE_NO_DEPS = true;\nthis.goog = this.goog || {};\n\n'))
    .pipe(footer('\n\ngoog.loadModule(function() {\n' +
      '  goog.module(\'incrementaldom\');\n' +
      '  return IncrementalDOM;\n' +
      '});\n'+
      '}).call(window);\n'
    ))
    .pipe(gulp.dest('build'));
});

gulp.task('minify', function() {
  return gulp.src('build/bundle.js')
    .pipe(minify())
    .pipe(gulp.dest('build'));
});

gulp.task('default', function(done) {
  runSequence('build', 'minify', done);
});
