import gulp from 'gulp';
import sass from 'gulp-sass';
import compiler from 'node-sass';
import sourcemaps from 'gulp-sourcemaps';
import clean from 'gulp-clean-css';
import gulpRename from 'gulp-rename';
import through2 from 'through2';
import { absDirHash } from '@/options/dirHash';
import develop from '@/options/develop';
import transfer from '@/options/transfer';
import { config } from '@/options/config';
import { absolute } from '@/options/dist';
import loader from '@/components/url-loader';
import csstree from '@/components/csstree';


(sass as any).compiler = compiler;

const rename = (() => {
  const { rename: name } = config;
  const type = typeof name;
  if(name && type === 'string') {
    return gulpRename(`${name}.css`);
  } else if(type === 'function') {
    return gulpRename;
  } else {
    return through2.obj();
  }
})();

// 任务：编译 scss
export default () => {
  return gulp
    .src(absDirHash.styles.output, {
      allowEmpty: true,
    })
    .pipe(
      develop
        ? sourcemaps.init()
        : through2.obj(),
    )
    .pipe(
      sass({
        outputStyle: 'expanded',
        includePaths: [ transfer ],
      }).on('error', sass.logError)
    )
    .pipe(loader({
      limit: config.limit,
    }))
    .pipe(csstree({
      
    }))
    .pipe(
      develop
        ? through2.obj()
        : clean(),
    )
    .pipe(rename)
    .pipe(
      develop
        ? sourcemaps.write('./')
        : through2.obj(),
    )
    .pipe(
      gulp.dest(absolute.bin),
    )
  ;
};