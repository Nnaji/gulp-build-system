import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import eslint from 'gulp-eslint';

let jscripts = function() {
    console.log('Running JS Tasks');
    return (browserify({ entries: ['./src/scripts/js/main.js'] })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/assets/js')));
};

let lint = function() {
    console.log('Linting JS files');
    return (gulp.src(['./src/js/*.js', './*js', '!./node_modules/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
    );
};

export { jscripts, lint };