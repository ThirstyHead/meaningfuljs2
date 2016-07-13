'use strict';

// Load Node Modules/Plugins
const browserSync = require('browser-sync');
const config = require('./gulpfile-config');
const del = require('del');
const childProcess = require('child_process');
const childProcessPromise = require('child-process-promise');
const gulp = require('gulp-help')(require('gulp'));
const gulpPlugin = require('gulp-load-plugins')({lazy: true});
const merge = require('merge-stream');
var packJson = require('./package.json');
const runSequence = require('run-sequence');

//NOTE: this hides tasks from 'gulp help' console output,
//      but leaves them runnable as dependent tasks
let hideFromTaskList = false;

/**
 * Builds runnable app
 */
gulp.task('build',
          'Builds developer-mode app in the build directory',
          ['build-html', 'build-js', 'build-jspm', 'build-css', 'build-img', 'build-bower'],
          (cb) => {
            // the 'lint' task will be run after all of the
            // dependent tasks have completed
            runSequence('lint', cb);
          });

/**
 * Builds Bower Components
 */
gulp.task('build-bower',
          hideFromTaskList,
          () => {
            return gulp.src(config.src.bower)
                       .pipe(gulp.dest(`${config.dir.build}/bower_components`));
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
 * Builds Images
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

            let appjs = gulp.src(config.src.js)
                            .pipe(gulp.dest(config.dir.build))
                            .on('end', () => {
                              // after *.js is copied from src to build,
                              // copy config.service.dev.js to config.service.js
                              gulp.src(`${config.dir.build}/components/config/config.service.dev.js`)
                                  .pipe(gulpPlugin.rename('components/config/config.service.js'))
                                  .pipe(gulp.dest(config.dir.build));
                            });


            let config_js = gulp.src('./config.js')
                                .pipe(gulp.dest(`${config.dir.build}/components`));
            return merge(appjs, config_js);
          });

/**
 * Ensures that JSPM artifacts are copied to the build directory
 */
gulp.task('build-jspm',
          hideFromTaskList,
          () => {
            // copy all jspm_packages
            let jspm_packages = gulp.src(`${config.dir.jspm}/**/*`)
                                    .pipe(gulp.dest(`${config.dir.build}/jspm_packages`));
            return merge(jspm_packages);
          });

/**
 * Only rebuilds src code, ignoring bower, jspm dependencies
 */
gulp.task('build-src',
          hideFromTaskList,
          ['build-html', 'build-js', 'build-css', 'build-img'],
          (cb) => {
            // the 'lint' task will be run after all of the
            // dependent tasks have completed
            runSequence('lint', cb);
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
 * Copies the build directory -> dist directory
 */
gulp.task('copy-build-to-dist',
          hideFromTaskList,
          () => {
            return gulp.src(`${config.dir.build}/**/*.*`)
                       .pipe(gulp.dest(config.dir.dist))
                       .on('end', () => {
                         // after *.js is copied from build to dist,
                         // copy config.service.prod.js to config.service.js
                         gulp.src(`${config.dir.dist}/components/config/config.service.prod.js`)
                             .pipe(gulpPlugin.rename('components/config/config.service.js'))
                             .pipe(gulp.dest(config.dir.dist));
                       });

          });

/**
 * Default task
 */
gulp.task('default',
          '*** Default task ***',
          ['help']);

/**
 * Builds production app
 */
gulp.task('dist',
          'Builds production-ready app in the dist directory',
          (cb) => {
            runSequence(
              ['reset', 'reset-npm'],
              'npm-install',
              'build',
              'copy-build-to-dist',
              'enable-prod-mode',
              'jspm-bundle',
              cb
            );
          },
          console.log('\n ///////////////////////////////////'),
          console.log(' Version: ' + packJson.version),
          console.log(' /////////////////////////////////// \n'));

/**
 * Enables ProdMode in Angular2
 */
gulp.task('enable-prod-mode',
          hideFromTaskList,
          () => {
            return gulp.src(`${config.dir.dist}/components/main.js`)
                       .pipe(gulpPlugin.replace('false;//set by gulpfile.js', 'true;'))
                       .pipe(gulp.dest(`${config.dir.dist}/components/`));
          });

/**
 * Performs a 'jspm bundle' to concatenate + minify JS dependencies
 * in dist directory
 */
gulp.task('jspm-bundle',
          hideFromTaskList,
          () => {
            return gulp.src(`${config.dir.dist}/components/main.js`)
                       .pipe(gulpPlugin.sourcemaps.init())
                       .pipe(gulpPlugin.jspm({minify:true, mangle:false}))
                       .pipe(gulpPlugin.sourcemaps.write('.'))
                       .pipe(gulp.dest(config.dir.dist));
          });

/**
 * Lints JavaScript files for syntax, styling errors and warnings
 */
gulp.task('lint',
          hideFromTaskList,
          () => {
            return gulp.src(['src/**/*.js','!node_modules/**', '!jspm_packages/**', '!config.js'])
                // eslint() attaches the lint output to the "eslint" property
                // of the file object so it can be used by other modules.
                .pipe(gulpPlugin.eslint())
                // eslint.format() outputs the lint results to the console.
                // Alternatively use eslint.formatEach() (see Docs).
                .pipe(gulpPlugin.eslint.format())
                // To have the process exit with an error code (1) on
                // lint error, return the stream and pipe to failAfterError last.
                .pipe(gulpPlugin.eslint.failAfterError());
          });

/**
 * Installs node dependencies listed in package.json
 */
gulp.task('npm-install',
         hideFromTaskList,
         () => {
           let options = {'capture': ['stdout', 'stderr']};
           return childProcessPromise.spawn('npm', ['install'], options)
                  .catch(function (err) {
                    console.error('npm install ERROR: ', err.stderr);
                  });
         });

/**
* Deletes generated and downloaded artifacts (jspm_packages, bower_components)
*/
gulp.task('reset',
         'Deletes generated (build, dist) ' +
         'and downloaded artifacts (jspm_packages, bower_components)',
         (cb) => {
           del.sync([config.dir.build, config.dir.dist, config.dir.jspm, config.dir.bower]);
           if (process.argv.indexOf('--hard') >= 0) {
             del.sync([config.dir.npm]);
           }
           return cb();
         });


 /**
 * Deletes node_modules directory
 */
gulp.task('reset-npm',
          hideFromTaskList,
          (cb) => {
            del.sync([config.dir.npm]);
            return cb();
          });

/**
 * Runs website (dev-mode)
 */
gulp.task('run',
          'Runs developer-mode website from the build directory',
          (cb) => {
            // run server
            let server = childProcess.spawn('npm', ['start']);
            server.stdout.on('data', (data) => console.log(`${data}`) );
            server.stderr.on('data', (data) => console.log(`${data}`) );
            server.on('close', (code) => console.log(`Server stopped: ${code}`) );

            console.log('\n ///////////////////////////////////');
            console.log(' Version: ' + packJson.version);
            console.log(' /////////////////////////////////// \n');

            cb();
          });

/**
 * Runs browsersync to keep browser in sync with source code during development
 */
gulp.task('sync',
          'Runs Browsersync to keep browser in sync with source code during development',
          ['run'],
          () => {
            let hostname = 'localhost';
            let webport = process.env.PORT || 8000;
            // Browsersync will watch for changes in /build
            // and restart automagically
            let options = {
              browser: ['google chrome'],
              files: [config.dir.build + '/**/*.*'],
              open: false,
              port: 4000,
              proxy: `${hostname}:${webport}`,
              reloadOnRestart: true
            };

            browserSync.init(options);
            console.log(`Visit http://${hostname}:${options.port} for resync`);

            // Gulp will watch for changes in /src/client
            // and rebuild automagically, triggering a BrowserSync restart
            return gulp.watch(`${config.dir.client}/**/*.*`, ['build-src']);
          });
