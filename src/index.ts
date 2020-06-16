import gulp from 'gulp';
import clean from '@/tasks/clean';
import scss from '@/tasks/scss';

const series = gulp.series(
  clean,
  scss,
);

gulp.task('default', series);