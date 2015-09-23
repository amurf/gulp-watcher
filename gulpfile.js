var gulp   = require('gulp');

var concat        = require('gulp-concat');
var babel         = require('gulp-babel');
var uglify        = require('gulp-uglify');
var watch         = require('gulp-watch');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var templateCache = require('gulp-angular-templatecache');

// Globals.
var dest = './app/';

var js_files       = 'src/js/*.js';
var template_files = 'src/templates/**';

var main_sass_file = 'src/sass/ea.scss';
var sass_files     = 'src/sass/**';

gulp.task('js', function() {
    return gulp.src(js_files)
        .pipe(sourcemaps.init())
        .pipe(concat('ea.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(dest))
});

gulp.task('templates', function() {
    return gulp.src(template_files)
        .pipe(templateCache('ea.templates.js', {module: 'ea'}))
        .pipe(gulp.dest(dest))
});


gulp.task('sass', function () {
  gulp.src(main_sass_file)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dest));
});


gulp.task('sass:watch', function () {
    gulp.watch(sass_files, ['sass']);
});

gulp.task('js:watch', function() {
    gulp.watch(sass_files, ['js']);
});

gulp.task('templates:watch', function() {
    gulp.watch(template_files, ['templates']);
});

gulp.task('default', ['js', 'templates']);
gulp.task('watch',   ['js:watch', 'templates:watch', 'sass:watch']);
