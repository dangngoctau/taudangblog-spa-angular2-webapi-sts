import * as gulp from 'gulp';
import { join } from 'path';

import Config from '../../config';

export = () => {
  return gulp.src([join(Config.TMP_DIR, 'silent-renew.html')])
    .pipe(gulp.dest(Config.PROD_DEST));
};
