/*----------------------------------------------------------------------------*\
    #THE UNIT SCSS BASEPLATE

    by @TheUnitGB
\*----------------------------------------------------------------------------*/
var gulp         = require( 'gulp' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    concat       = require( 'gulp-concat' ),
    sass         = require( 'gulp-sass' ),
    sourcemaps   = require( 'gulp-sourcemaps' ),
    iconfont     = require( 'gulp-iconfont' ),
    iconfontCss  = require( 'gulp-iconfont-css' ),
    imagemin     = require( 'gulp-imagemin' ),
    uglify       = require( 'gulp-uglify' ),
    pump         = require( 'pump' ),
    browserSync  = require( 'browser-sync' ).create();

var   servePath = './src'
      base_path = './src',
      src = base_path + '/assets',
      dist = './src/assets',
      destPaths = {
            js:     dist + '/js',
            css:    dist +'/css',
            icons:  dist + '/icons',
            fonts:  dist + '/fonts',
            img:    dist + '/img'
        },
      sourcePaths = {
            js:  [
                   src + '/js/custom/*.js',
                   src + '/js/**/*.js'
                 ],
          scss:  [
                   src +'/scss/*.scss',
                   src +'/scss/**/* .scss',
                   src +'/scss/**/**/*.scss'
                 ],
          icons: [ src + '/icons/**/*'],
           html: [ './src/*.html'],
            img: [ src + '/img'],
          fonts: [ src + '/fonts/**/*' ],
            svg: [ src + '/icons/*.svg' ]
      };

gulp.task( 'serve', function() {

    browserSync.init( {
        server: {
            baseDir: servePath
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '20px',
                right: '20px',
                borderRadius: '14px',
                backgroundColor: '#fff',
                color: '#000',
                boxShadow: '0px 0px 5px 0px rgba( 0, 0, 0, 0.5 )'
            }
        }
    } );

    gulp.watch( sourcePaths.scss,  [ 'scss' ] );
    gulp.watch( sourcePaths.js,  [ 'js' ] );
    gulp.watch( sourcePaths.icons, [ 'iconfont' ] );
    gulp.watch( sourcePaths.html ).on( 'change', browserSync.reload );

} );


gulp.task( 'scss', function() {

    return gulp.src( sourcePaths.scss )
        .pipe( sourcemaps.init() )
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( autoprefixer( {
            browsers: [ 'last 2 versions', 'ie > 9' ],
            cascade: false
        } ) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( destPaths.css ) )
        .pipe( browserSync.stream() );

} );


gulp.task( 'scss:build', function() {

    return gulp.src( sourcePaths.scss )
        .pipe( sass( {
            outputStyle: 'compressed'
        } ).on( 'error', sass.logError ) )
        .pipe( autoprefixer( {
            browsers: [ 'last 2 versions', 'ie > 9' ],
            cascade: false
        } ) )
        .pipe( gulp.dest( destPaths.css ) );

} );


gulp.task( 'js', function() {

    return gulp.src( sourcePaths.js )
        .pipe( sourcemaps.init() )
        .pipe( concat( 'main.js' ) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( destPaths.js ) )
        .pipe( browserSync.stream() );

} );


gulp.task( 'js:build', function( cb ) {

    pump( [
        gulp.src( sourcePaths.js ),
        concat( 'main.js' ),
        uglify(),
        gulp.dest( destPaths.js )
    ], cb );

} );


gulp.task( 'vendor-js', function() {

    return gulp.src( [

    ] )
        .pipe( concat( 'vendor.js' ) )
        .pipe( gulp.dest( destPaths.js ) )
        .pipe( browserSync.stream() );

} );


gulp.task( 'vendor-js:build', function() {

    return gulp.src( [

    ] )
        .pipe( concat( 'vendor.js' ) )
        .pipe( gulp.dest( destPaths.js ) );

} );


gulp.task( 'images:build', function() {

    gulp.src( sourcePaths.img )
        .pipe( imagemin() )
        .pipe( gulp.dest( destPaths.img ) );

} );


gulp.task( 'html', function() {

    gulp.src( 'src/*.html' )
        .pipe( gulp.dest( 'dist/' ) );

} );


gulp.task( 'fonts', function() {

    gulp.src( sourcePaths.fonts )
        .pipe( gulp.dest( destPaths.fonts ) );

} );

var runTimestamp = Math.round( Date.now() / 1000 ),
    iconFontName = 'iconfont'; // Change this to whatever is required

gulp.task( 'iconfont', function() {

    return gulp.src( sourcePaths.svg )
        .pipe( iconfontCss( {
            fontName: iconFontName,
            path: './src/assets/icons/_icons.tpl.scss',
            targetPath: '../scss/includes/definitions/_icons.scss',
            fontPath: '../fonts/'
        } ) )
        .pipe( iconfont( {
            fontName: iconFontName,
            prependUnicode: true,
            formats: [ 'ttf', 'eot', 'woff' ],
            timestamp: runTimestamp,
        } ) )
        .pipe( gulp.dest( destPaths.fonts ) )
        .pipe( browserSync.stream() );

} );


gulp.task( 'build', [
    'html',
    'scss',
    'js',
    'vendor-js',
    'scss:build',
    'js:build',
    'vendor-js:build',
    'images:build',
    'fonts' ]
);
