# gulp-build-system
## Gulp using the es6 syntax

## Installation

Start by installing gulp globally

The following packages are also require
@babel/core @babel/cli @babel/preset-env @babel/register

```
npm install -global gulp
npm install --save-dev gulp
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/register

```
## gulp basic configuration

Creeate a file gulpfile.babel.js at the root of your directory

Add the following configuration:


```javascript
import gulp from 'gulp';
let scripts = () => {
    return gulp.src('./src/js/index.js').pipe(gulp.dest('./dist/js'));
    };
let build = gulp.series(scripts)

export default build;
```
Now run gulp
