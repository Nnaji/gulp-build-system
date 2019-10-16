import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import cleanCss from 'gulp-clean-css';
import * as fs from 'fs';
import del from 'del';

// Local imports
import {paths} from './gutils/paths';
import {logMessages} from './gutils/log-messages';

// Javascript Task section f()
let jscripts = function() {
    logMessages('Running JS Tasks');
    lint();
    return browserify({entries: [paths.jscripts.src]})
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/assets/js'));
};

// JS linting Task section f()
let lint = function() {
    logMessages('Running Linting Task');
    logMessages('Linting JS files');
    return gulp
        .src(['./src/scripts/js/*.js', './*js', '!./node_modules/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

// Styles Task section f()
let styles = function() {
    logMessages('Running Styles task');
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest(paths.styles.dest));
};

// Clean Task Section
let clean = function(cb) {
    logMessages('Runnig Cleaning Task');
    if (!fs.existsSync('dist')) {
        logMessages('dist folder does not exists');
    } else {
        logMessages('Deleting dist folder........');
        del.sync('dist');
        logMessages('dist folder deleted');
    }
    cb();
};

// Image Task Section
let image = function() {
    logMessages('Running Image Task');
    return gulp
        .src(paths.images.src)
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest(paths.images.dest));
};
const build = gulp.series(clean, lint, jscripts, styles, image);

export default build;

export {clean, jscripts, styles, lint, image};
