var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
// Access plugins like this: $.autoprefixer()
var $ = require('gulp-load-plugins')({camelize: true});


//var sass_path = 'theme-github/**/*.scss'; //Github Theme
var sass_path = 'theme-magento2-frontend-infobam/web/css/**/*.scss'; //Infobam
var sass_dest = 'styleguide/css';
var sass_dest_clear = 'styleguide';

gulp.task('browser-sync', function() {
  browserSync({
    proxy: {
      target: 'magento2-hologram:8080'
    }
  });
});

/**
 * Sass task
 * - Compiles Sass into CSS 
 * - Includes node-neat
 */
gulp.task('sass', function() {
  gulp.src(sass_path)
  .pipe($.sass({
    outputStyle: 'expanded', // compressed, expanded
    errLogToConsole: true,
    sourceComments: true,
  }))
  .pipe(gulp.dest(sass_dest))
  .pipe($.notify({
    onLast: true,
    message: function () {
      return 'Sass compiled :)';
    }
  }))
  .pipe(reload({
    stream: true
  }));
});


/**
 * Styleguide task
 * - This tasks points hologram to your project level config file
 * - Dependency - sass 
 */
gulp.task('styleguide', ['sass'], function() {
  gulp.src('./hologram_config.yml')
    .pipe($.hologram({logging:true}));
});


/**
 * Clears out the processed files.
 */
gulp.task('clear', function() {
  del([sass_dest_clear], { 'force': true });
});

/**
 * Watch task
 * - Watches for changes on Sass and runs the styleguide task
 */
gulp.task('watch', function() {
  gulp.watch(sass_path, ['styleguide']); 
});

/**
 * Default task
 */
gulp.task('default', ['styleguide','watch','browser-sync']);




