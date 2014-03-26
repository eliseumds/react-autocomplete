'use strict';

var fs = require('fs');

var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

var connect = require('gulp-connect');
var react = require('gulp-react');
var watch = require('gulp-watch');

gulp.task('connect', connect.server({
    root: ['app'],
    port: 8000,
    livereload: true
}));

gulp.task('jsx', function() {
    gulp.src('./app/components/**/*.jsx')
        .pipe(watch(function(files) {
            return files.pipe(plumber())
                        .pipe(react())
                        .on('error', gutil.log)
                        .on('error', gutil.beep)
                        .pipe(gulp.dest('./public/js/app/components'));
        }));
});

gulp.task('default', ['connect', 'jsx']);
