'use strict';

// Load Node Modules/Plugins
let config = require('./gulpfile-config');
let gulp = require('gulp-help')(require('gulp'));
let gulpPlugin = require('gulp-load-plugins')({lazy: true});
let del = require('del');
let browserSync = require('browser-sync');
let merge = require('merge-stream');

//NOTE: this hides tasks from 'gulp help' console output,
//      but leaves them runnable as dependent tasks
let hideFromTaskList = false;

/**
 * Default task
 */
gulp.task('default',
          '*** Default task ***',
          ['help']);

/**
 * Builds runnable app
 */
gulp.task('build',
          'Builds runnable app (dev-mode)',
          ['build-html', 'build-js', 'build-css', 'build-img'],
          () => {

          });

/**
 * Builds CSS
 */
gulp.task('build-css',
          hideFromTaskList,
          () => {
              return gulp.src(config.src.css)
                         .pipe(gulp.dest(config.dir.build));
          });

/**
 * Builds HTML
 */
gulp.task('build-html',
          hideFromTaskList,
          () => {
              return gulp.src(config.src.html)
                         .pipe(gulp.dest(config.dir.build));
          });

/**
 * Builds HTML
 */
gulp.task('build-img',
          hideFromTaskList,
          () => {
              return gulp.src(config.src.img)
                         .pipe(gulp.dest(config.dir.build));
          });

/**
 * Builds JavaScript
 */
gulp.task('build-js',
          hideFromTaskList,
          () => {
              // copy all app js, config.js, and jspm_packages
              let appjs = gulp.src(config.src.js)
                              .pipe(gulp.dest(config.dir.build));
              let jspm_packages = gulp.src(`${config.dir.jspm}/**/*`)
                                      .pipe(gulp.dest(`${config.dir.build}/jspm_packages`));
              let config_js = gulp.src('./config.js')
                                  .pipe(gulp.dest(`${config.dir.build}/components`));
              return merge(appjs, jspm_packages, config_js);
          });

/**
 * Deletes generated artifacts
 */
gulp.task('clean',
          'Deletes generated artifacts (build, dist)',
          (cb) => {
              del.sync([config.dir.build, config.dir.dist]);
              return cb();
          });

/**
 * Builds production app
 */
gulp.task('dist',
          'Builds production app (prod-mode)',
          () => {

          });

/**
 * Keeps web server up and running
 * Called by 'run' task
 */
gulp.task('nodemon',
           hideFromTaskList,
           (cb) => {
               let started = false;
               let nodemonOptions = {
                   script: config.dir.server + '/server.js',
                   watch: [config.dir.server + '/server.js',
                           config.dir.build + '/**/*.*']
               };

               return gulpPlugin.nodemon(nodemonOptions)
               .on('start', () => {
                   console.log('*** nodemon started');
                   if(!started){
                       cb();
                   }
                   started = true;
               })
               .on('restart', () => {
                   console.log('*** nodemon restarted');
               })
               .on('crash', () => {
                   console.log('*** nodemon crashed: script crashed for some reason');
               })
               .on('exit', () => {
                   console.log('*** nodemon exited cleanly');
               });
           });

/**
* Deletes generated and downloaded artifacts (node_modules, jspm_packages)
*/
gulp.task('reset',
         'Deletes generated (build, dist) ' +
         'and downloaded artifacts (node_modules, jspm_packages)',
         (cb) => {
             del.sync([config.dir.build, config.dir.dist, config.dir.jspm, config.dir.npm]);
             return cb();
         });

/**
 * Runs website (dev-mode)
 */
gulp.task('run',
          'Runs website (dev-mode)',
          ['nodemon'],
          () => {
              let hostname = process.env.HOSTNAME || config.web.hostname || 'localhost';
              let port = process.env.PORT || config.web.port || 8000;
              let syncPort = process.env.SYNC_PORT || 4000;
              let browserSyncOptions = {
                  // All of the following files will be watched
                  files: [config.dir.build + '/**/*.*'],

                  // Tells BrowserSync on where the express app is running
                  proxy: `http://${hostname}:${port}`,

                  // This port should be different from the express app port
                  port: syncPort,

                  // Which browser should we launch?
                  browser: ['google chrome']
              };

              browserSync.init(browserSyncOptions);

              // Register a watcher on the src directory for changes,
              // which will update the build directory,
              // which will trigger browserSync + nodemon
              return gulp.watch(config.dir.src + '/**/*.*', ['build']);
          });

/**
 * Runs website (prod-mode)
 */
gulp.task('run-prod',
          'Runs website (prod-mode)',
          () => {

          });

/**
 * Runs tests
 */
gulp.task('test',
          'Runs tests',
          () => {

          });
