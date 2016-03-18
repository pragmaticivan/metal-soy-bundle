'use strict';

var concat = require('gulp-concat');
var footer = require('gulp-footer');
var gulp = require('gulp');
var header = require('gulp-header');
var runSequence = require('run-sequence');
var minify = require('gulp-minify');
var replace = require('gulp-replace');

var src = [
  'node_modules/google-closure-library/closure/goog/base.js',
  'node_modules/google-closure-library/closure/goog/fs/url.js',
  'node_modules/google-closure-library/closure/goog/dom/nodetype.js',
  'node_modules/google-closure-library/closure/goog/debug/error.js',
  'node_modules/google-closure-library/closure/goog/string/string.js',
  'node_modules/google-closure-library/closure/goog/asserts/asserts.js',
  'node_modules/google-closure-library/closure/goog/string/typedstring.js',
  'node_modules/google-closure-library/closure/goog/string/const.js',
  'node_modules/google-closure-library/closure/goog/i18n/bidi.js',
  'node_modules/google-closure-library/closure/goog/html/safeurl.js',
  'node_modules/google-closure-library/closure/goog/array/array.js',
  'node_modules/google-closure-library/closure/goog/html/safestyle.js',
  'node_modules/google-closure-library/closure/goog/html/safescript.js',
  'node_modules/google-closure-library/closure/goog/html/trustedresourceurl.js',
  'node_modules/google-closure-library/closure/goog/html/safestylesheet.js',
  'node_modules/google-closure-library/closure/goog/object/object.js',
  'node_modules/google-closure-library/closure/goog/dom/tags.js',
  'node_modules/google-closure-library/closure/goog/dom/tagname.js',
  'node_modules/google-closure-library/closure/goog/labs/useragent/util.js',
  'node_modules/google-closure-library/closure/goog/labs/useragent/browser.js',
  'node_modules/google-closure-library/closure/goog/html/safehtml.js',
  'node_modules/google-closure-library/closure/goog/html/uncheckedconversions.js',
  'node_modules/google-closure-library/closure/goog/soy/data.js',
  'node_modules/google-closure-library/closure/goog/labs/useragent/platform.js',
  'node_modules/google-closure-library/closure/goog/labs/useragent/engine.js',
  'node_modules/google-closure-library/closure/goog/useragent/useragent.js',
  'node_modules/google-closure-library/closure/goog/math/size.js',
  'node_modules/google-closure-library/closure/goog/dom/safe.js',
  'node_modules/google-closure-library/closure/goog/dom/browserfeature.js',
  'node_modules/google-closure-library/closure/goog/math/math.js',
  'node_modules/google-closure-library/closure/goog/math/coordinate.js',
  'node_modules/google-closure-library/closure/goog/dom/dom.js',
  'node_modules/google-closure-library/closure/goog/soy/soy.js',
  'node_modules/google-closure-library/closure/goog/string/stringbuffer.js',
  'node_modules/google-closure-library/closure/goog/structs/inversionmap.js',
  'node_modules/google-closure-library/closure/goog/i18n/graphemebreak.js',
  'node_modules/google-closure-library/closure/goog/format/format.js',
  'node_modules/google-closure-library/closure/goog/structs/collection.js',
  'node_modules/google-closure-library/closure/goog/structs/structs.js',
  'node_modules/google-closure-library/closure/goog/functions/functions.js',
  'node_modules/google-closure-library/closure/goog/iter/iter.js',
  'node_modules/google-closure-library/closure/goog/structs/map.js',
  'node_modules/google-closure-library/closure/goog/structs/set.js',
  'node_modules/google-closure-library/closure/goog/debug/debug.js',
  'node_modules/google-closure-library/closure/goog/i18n/bidiformatter.js',
  'node_modules/closure-templates/soyutils_usegoog.js',
  'vendor/incremental-dom.js'
];

gulp.task('build', function() {
  return gulp.src(src)
    .pipe(concat('bundle.js'))
    .pipe(replace('var goog = goog || {};', 'var goog = this.goog || {};'))
    .pipe(header('this.CLOSURE_NO_DEPS = true;\nthis.goog = this.goog || {};\n\n'))
    .pipe(footer('\n\ngoog.loadModule(function() {\n' +
      '  goog.module(\'incrementaldom\');\n' +
      '  return IncrementalDOM;\n' +
      '});'
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
