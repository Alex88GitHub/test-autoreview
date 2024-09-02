import gulp from 'gulp';
import browserSync from 'browser-sync';
import {deleteAsync} from 'del';
import {compileStyles, compileMinStyles} from './gulp/compileStyles.mjs';
import {copy, copyImages, copySvg} from './gulp/copyAssets.mjs';
import { optimizeImages, createWebp } from './gulp/optimizeImages.mjs';

const server = browserSync.create();
const streamStyles = () => compileStyles().pipe(server.stream());

const clean = () => {
  return deleteAsync('build');
};

const syncServer = () => {
  server.init({
    server: 'build/',
    index: 'index.html',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('src/**.html', gulp.series(copy, refresh));
  gulp.watch('src/sass/**/*.{scss,sass}', streamStyles);
  gulp.watch('src/img/**/*.svg', gulp.series(copySvg, refresh));
  gulp.watch('src/img/**/*.{png,jpg,webp}', gulp.series(copyImages, refresh));
};

const refresh = (done) => {
  server.reload();
  done();
};

const build = gulp.series(clean, copy, copyImages, copySvg, compileMinStyles);
const start = gulp.series(
  clean,
  copy,
  copyImages,
  copySvg,
  gulp.parallel(
    optimizeImages,
    createWebp,
  ),
    compileStyles,
    syncServer

);

export { start };
