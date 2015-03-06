// load the necessary requirements
var gulp = require('gulp'),
    // less/css
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    minify = require('gulp-minify-css'),
    // javascript
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    // html
    include = require('gulp-file-include'),
    // general
    concat = require('gulp-concat'),
    del = require('del'),
    connect = require('gulp-connect');

// clean tasks
gulp.task('clean', function(cb){
    del(['build/**'], cb);
});
gulp.task('clean-js', function(cb){
    del(['build/js/**'], cb);
});
gulp.task('clean-html', function(cb){
    del(['build/**/*.{html,php,txt}'], cb);
});
gulp.task('clean-img', function(cb){
    del(['build/images/**'], cb);
});
gulp.task('clean-css', function(cb){
    del(['build/css/*.css'], cb);
});

// javascript
gulp.task('js', ['clean-js'], function(){
    gulp.src([
                'bower_components/jquery/dist/jquery.min.js', 
                // add anything else here
                'src/js/*.js'
             ])
        .pipe(jshint())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'))
        .pipe(connect.reload());
});

// html
gulp.task('html', ['clean-html'], function(){
    gulp.src('src/*.{html,php,txt}')
        .pipe(include({ 
            basepath: 'src/'
        }))
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
    gulp.src('src/.htaccess').pipe(gulp.dest('./build/'));
});

// images
gulp.task('images', ['clea-img'], function(){
    gulp.src('src/images/**/*.*')
        .pipe(gulp.dest('./build/images/'))
        .pipe(connect.reload());
});

// less
gulp.task('less', ['clean-css'], function(){
    // generate the css
    gulp.src([
            'src/less/styles.less'
            ])
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(gulp.dest('./build/css/'))
        .pipe(connect.reload());
    // move bootstrap files
    gulp.src('bower_components/bootstrap/fonts/*.*')
        .pipe(gulp.dest('./build/css/fonts/'));
});

// server and watch
gulp.task('connect', ['html', 'images', 'less', 'js'], function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});
gulp.task('watch', function () {
    gulp.watch(['src/less/**/*.less'], ['less']);
    gulp.watch(['src/js/**/*.js'], ['js']);
    gulp.watch(['src/images/**/*.*'], ['images']);
    gulp.watch(['src/**/*.{html,php}'], ['html']);
});

gulp.task('serve', ['connect', 'watch']);
gulp.task('build', ['less', 'js', 'html', 'images']);
gulp.task('default', ['serve']);
