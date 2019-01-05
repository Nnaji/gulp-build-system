import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';

import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';

let jscripts = function() {
    console.log('Running JS Tasks');
    return (
        browserify({
            entries: ['./src/scripts/js/main.js']
        })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/assets/js')));
};

let styles = function() {
    console.log('Running Styles task');
    return (gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(sourcemaps.write("./map"))
        .pipe(gulp.dest('./dist/assets/css'))
    );

};


export { jscripts, styles };