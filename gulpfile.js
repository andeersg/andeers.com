const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const serviceWorker = require('./_tasks/sw');

const paths = {
  styles: {
      src: '_dev/scss/*.scss',
      dest: 'assets/css'
  },
  sw: {
    src: '_dev/service-worker.js',
    dest: '_site',
  }
}

function style() {
  return src(paths.styles.src)
    .pipe(sass()).on('error', sass.logError)
    .pipe(postcss([
      autoprefixer(),
      cssnano({preset: 'default'}),
    ]))
    .pipe(dest(paths.styles.dest));
}

function watcher(){
  watch('_dev/**/*.scss', style);
}

exports.watch = watcher;
exports.style = style;
exports.sw = serviceWorker;