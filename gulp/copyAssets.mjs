import gulp from 'gulp';


const copySvg = () =>
  gulp.src('src/img/**/*.svg', {base: 'src', encoding: false})
      .pipe(gulp.dest('build'));

const copyImages = () =>
  gulp.src('src/img/**/*.{png,jpg,webp}', {base: 'src', encoding: false})
      .pipe(gulp.dest('build'));

const copy = () =>
  gulp.src([
    'src/**.html',
    'src/fonts/**',
    'src/img/**'
  ], {
    base: 'src', encoding: false
  })
      .pipe(gulp.dest('build'));

export {copy, copyImages, copySvg};
