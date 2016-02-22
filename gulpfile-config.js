'use strict';

///////////////////////////
// variables and settings
///////////////////////////

// dir is for simple directory paths
let dir = {};
module.exports.dir = dir;

dir.build = './build';
dir.dist = './dist';
dir.src = './src';
dir.client = dir.src + '/client';
dir.server = dir.src + '/server';
dir.jspm = './jspm_packages';
dir.npm = './node_modules';

// src is for logical groups of source files
// for example: 'src.img' includes *.png, *.jpg, etc.
// also, src logical groups include nested directories
let src = {};
module.exports.src = src;

src.html = [dir.client + '/**/*.html'];
src.css = [dir.client + '/**/*.css'];
src.img = [
    dir.client + '/**/*.png',
    dir.client + '/**/*.jpg',
    dir.client + '/**/*.gif'
];
src.favicon = [dir.client + '/favicon.ico'];
src.js = [dir.client + '/**/*.js'];

// build is for logical groups of built files
// for example: ES6 JavaScript files that have been
//              transpiled into ES5 files
let build = {};
module.exports.build = build;

build.html = dir.build;
build.css = dir.build + '/css';
build.img = dir.build + '/img';
build.js = dir.build + '/js';

// dist is for logical groups of files ready for distribution
// for example: JavaScript files that have been
//              concatenated and minified
// dist files are ready to be pushed into production
let dist = {};
module.exports.dist = dist;

dist.html = dir.dist;
dist.css = dir.dist + '/css';
dist.img = dir.dist + '/img';
dist.js = dir.dist + '/js';

// web server configuration
let web = {};
module.exports.web = web;

web.hostname = 'localhost';
web.port = 8000;






