const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const paths = {
  styles: {
      // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
      src: '_dev/scss/*.scss',
      // Compiled files will end up in whichever folder it's found in (partials are not compiled)
      dest: 'assets/css'
  }

  // Easily add additional paths
  // ,html: {
  //  src: '...',
  //  dest: '...'
  // }
}


// Define tasks after requiring dependencies
function style(){
  return gulp.src(paths.styles.src)
    // Use sass with the files found, and log any errors
    .pipe(sass()).on('error', sass.logError)
    .pipe(postcss([
      autoprefixer(),
    ]))
    // What is the destination for the compiled file?
    .pipe(gulp.dest(paths.styles.dest));
}

function watch(){
  // gulp.watch takes in the location of the files to watch for changes
  // and the name of the function we want to run on change
  gulp.watch('_dev/**/*.scss', style);
}

// Don't forget to expose the task!
exports.watch = watch;
exports.style = style;