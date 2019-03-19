'use strict';

const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const shell = require('gulp-shell');

/**
 * Remove build directory
 */
gulp.task('clean', function () {
  return gulp.src(outDir, { read: false })
    .pipe(rimraf());
});

/**
 * Lint all custom TypeScript files
 */
gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report());
})

gulp.task('compile', shell.task([
  'npm run tsc'
]));

gulp.task('public', (cb) => {
  return gulp.src('src/public/**/*.*')
    .pipe(gulp.dest('./build/public'));
});

gulp.task('template', (cb) => {
  return gulp.src('src/template/*.*')
    .pipe(gulp.dest('./build/template'));
});

gulp.task('build', gulp.series('tslint', 'compile', 'public', 'template', (done) => {
  console.log('Building the project ...');
  done && done();
  console.log('Building end...');
  console.log('-----------------------------------------------------------------------------');
}));

gulp.task('default', gulp.series('build'));