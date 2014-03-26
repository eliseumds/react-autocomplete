'use strict';

var fs = require('fs');

var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

var react = require('gulp-react');
var watch = require('gulp-watch');

gulp.task('jsx', function() {
    gulp.src('./public/js/components/**/*.jsx')
        .pipe(watch(function(files) {
            return files.pipe(plumber())
                        .pipe(react())
                        .on('error', gutil.log)
                        .on('error', gutil.beep)
                        .pipe(gulp.dest('./public/js/components'));
        }));
});

gulp.task('default', ['jsx']);
