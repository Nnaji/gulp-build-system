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
import fs from 'fs';
import del from 'del';
import print from 'gulp-print';
import browserSync from 'browser-sync';
// import * as log from 'fancy-log';
// import * as c from 'ansi-colors';
browserSync.create();

// Dev Server with browsersync
let serve = function() {
    logMessages('Running Serve Task');
    browserSync.init({
        server: {
            baseDir: './',
        },
    });
    wFiles();
};
// Local imports
import { paths } from './gutils/paths';
import { logMessages } from './gutils/log-messages';

// Javascript Task section f()
let jscripts = function() {
    logMessages('Running JS Tasks');
    lint();
    return browserify({ entries: [paths.jscripts.src] })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(browserSync.stream());
};

// JS linting Task section f()
let lint = function() {
    logMessages('Running Linting Task');
    logMessages('Linting JS files');
    return gulp
        .src(['./src/scripts/js/*.js', './*js', '!./node_modules/**/*.js'])
        .pipe(print())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

// Styles Task section f()
let styles = function() {
    logMessages('Running Styles task');
    return gulp
        .src(paths.styles.src)
        .pipe(print())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
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
        .pipe(print())
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream());
};

let wFiles = () => {
    logMessages('Running Watch Files Task');
    gulp.watch('./src/scripts/**/*.js', jscripts);
    gulp.watch('./src/styles/**/*.scss', styles);
    gulp.watch('./*.html').on('change', browserSync.reload);
};

const build = gulp.series(clean, gulp.parallel(styles, jscripts, image, serve));

export default build;

export { clean, jscripts, styles, lint, image, serve, wFiles };
