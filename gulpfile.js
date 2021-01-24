const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');

const paths = {
  styles: {
      src: '_dev/scss/*.scss',
      dest: 'assets/css',
  },
  icons: {
    src: '_dev/icons/*.svg',
    dest: 'assets/icons',
  },
  sw: {
    src: '_dev/service-worker.js',
    dest: '_site',
  }
}

function iconSprite() {
  return src(paths.icons.src)
  .pipe(svgSprite({
    mode: {
      dest: '.',
      symbol: {
        dest: ".",
        sprite: "symbols.svg",
        inline: true,
      },
    },
  }))
  .pipe(dest(paths.icons.dest));
}

function optimizeIcons() {
  return src(paths.icons.src)
    .pipe(svgmin())
    .pipe(dest(paths.icons.dest));
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

function serviceWorker() {
  return src(paths.sw.src)
    .pipe(dest(paths.sw.dest));
}

function watcher(){
  watch('_dev/**/*.scss', style);
  watch('_dev/icons/*.svg', optimizeIcons);
}

exports.watch = watcher;
exports.style = style;
exports.sw = serviceWorker;
exports.iconSprite = iconSprite;
exports.optimizeIcons = optimizeIcons;
exports.build = series(style, serviceWorker);