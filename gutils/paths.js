let paths = {
    allJs: ['./src/scripts/**/*.js', './*.js'],
    jscripts: {
        src: './src/scripts/js/main.js',
        dest: './dist/assets/js',
    },
    styles: {
        src: './src/styles/main.scss',
        dest: './dist/assets/css',
    },
    images: {
        src: './src/images/**/*',
        dest: './dist/assets/img',
    },
};

export { paths };
