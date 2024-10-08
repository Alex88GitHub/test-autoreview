import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';
import gcmq from 'gulp-group-css-media-queries';
import rename from 'gulp-rename';

const sass = gulpSass(dartSass);

const compileStyles = () =>
  gulp
      .src('src/sass/style.scss', {sourcemaps: true})
      .pipe(sass().on('error', sass.logError))
      .pipe(
          postcss([
            autoprefixer({
              grid: true,
            })]))
      .pipe(gulp.dest('build/css'))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('build/css', {sourcemaps: '.'}));

const compileMinStyles = () =>
  gulp
      .src('src/sass/style.scss', {sourcemaps: true})
      .pipe(sass().on('error', sass.logError))
      .pipe(
          postcss([
            autoprefixer({
              grid: true,
            })]))
      .pipe(gcmq())
      .pipe(gulp.dest('build/css'))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('build/css', {sourcemaps: '.'}));

export {compileStyles, compileMinStyles};
