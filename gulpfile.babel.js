import gulp from 'gulp';
import getApp from './index';

gulp.task('run', (cb) => {
  getApp().listen(process.env.PORT || 3000, cb);
});
