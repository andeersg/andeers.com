var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');

gulp.task('css', function () {
  return gulp.src('_dev/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 2 versions', 'Explorer 9']}))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function() {
  return gulp.src('_dev/js/*.js')
    //.pipe(jshint('.jshintrc')) // https://github.com/jshint/jshint/blob/master/examples/.jshintrc
    //.pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('jekyll', ['css'], function (gulpCallBack){
  var spawn = require('child_process').spawn;
  var jekyll = spawn('jekyll', ['build', '--incremental'], {stdio: 'inherit'});

  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});

// Default task
gulp.task('default', ['css', 'js']); // , 'images'

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('_dev/scss/**/*.scss', ['css']);

  // Watch .js files
  gulp.watch('_dev/js/*.js', ['js']);
});
