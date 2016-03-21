// import 'zone.js';
// import 'reflect-metadata';
// import 'angular2/bundles/angular2-polyfills';
// import 'core-js';

import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone-microtask';
import 'rxjs/Rx';

import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app/app.component';
bootstrap(AppComponent);
