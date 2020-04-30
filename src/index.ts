import gulp from 'gulp';
import clean from '@/tasks/clean';

const series = gulp.series(
  clean,
);

gulp.task('default', series);