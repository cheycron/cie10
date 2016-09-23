var js = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/lodash/dist/lodash.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.js',
    'app/app.js'
];

var css = [
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.css',
    'app/app.css',
];

var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');
    gp_jsonmin = require('gulp-jsonminify');
    gp_cssmin = require('gulp-cssmin');

gulp.task('build.css', function() {
    return gulp.src(css)
        .pipe(gp_concat('app.css'))
        .pipe(gp_cssmin())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('build.font', function() {
    return gulp.src(['bower_components/bootstrap/dist/fonts/**/*']).pipe(gulp.dest('dist/fonts'));
});

gulp.task('build.js', function() {
    return gulp.src(js)
        .pipe(gp_concat('app.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('build.database', function() {
    return gulp.src('app/database.json')
        .pipe(gp_jsonmin())
        .pipe(gp_rename('database.json'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('default', ['build.css', 'build.font', 'build.js', 'build.database'], function() {});