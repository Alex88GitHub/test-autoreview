import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';

const optimizeImages = () => {
  return gulp.src('src/img/**/*.{jpg,png}', {base: 'src', encoding: false})
   .pipe(imagemin([
    imageminMozjpeg({ quality: 75, progressive: true }),
    imageminOptipng({ optimizationLevel: 3 }),
  ]))
   .pipe(gulp.dest('build'))
}

const createWebp = () => {
  return gulp.src('src/img/**/*.{jpg,png}', {base: 'src', encoding: false})
    .pipe(webp({
      quality: 75,
    }))
    .pipe(gulp.dest('build'))
}

export {optimizeImages, createWebp};
