import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';

import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';

// Local imports
import { paths } from './gutils/paths';

// Javascript Task section f()
let jscripts = function() {
    console.log('Running JS Tasks');
    return (
        browserify({
            entries: [paths.jscripts.src]
        })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.jscripts.dest)));
};

// Styles Task section f()
let styles = function() {
    console.log('Running Styles task');
    return (gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(sourcemaps.write("./map"))
        .pipe(gulp.dest(paths.styles.dest))
    );
};


export { jscripts, styles };