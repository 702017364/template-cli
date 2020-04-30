import gulp from 'gulp';
import sass from 'gulp-sass';
import compiler from 'node-sass';
import sourcemaps from 'gulp-sourcemaps';
import clean from 'gulp-clean-css';
import gulpRename from 'gulp-rename';
import { absDirHash } from '@/options/dirHash';
import develop from '@/options/develop';
import emptyTask from '@/utils/emptyTask';
import transfer from '@/options/transfer';
import { config } from '@/options/config';
import dist from '@/options/dist';

(sass as any).compiler = compiler;

const rename = (() => {
  const { rename: name } = config;
  const type = typeof name;
  if(name && type === 'string') {
    return gulpRename(`${name}.css`);
  } else if(type === 'function') {
    return gulpRename;
  } else {
    return emptyTask;
  }
})();

// 任务：编译 scss
export default () => {
  return gulp.src(absDirHash.styles.output)
    .pipe(
      develop ? sourcemaps.init() : emptyTask
    )
    .pipe(
      sass({
        outputStyle: 'expanded',
        includePaths: [ transfer ],
      }).on('error', sass.logError)
    )
    .pipe(
      develop ? emptyTask : clean()
    )
    .pipe(rename)
    .pipe(
      develop ? sourcemaps.write('./') : emptyTask
    )
    .pipe(
      gulp.dest(dist.absolute.bin)
    )
  ;
};