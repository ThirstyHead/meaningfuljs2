// angular2 beta.5
// import 'zone.js';
// import 'reflect-metadata';
// import 'angular2/bundles/angular2-polyfills';
// import 'core-js';

// angular2 beta.7
// import 'es6-shim';
// import 'reflect-metadata';
// import 'zone.js/dist/zone-microtask';
// import 'rxjs/Rx';

// angular2 beta.14
// import 'es6-shim';
// import 'reflect-metadata';
// import 'zone.js/dist/zone';
// import 'rxjs/Rx';

// angular2 rc.1
import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'rxjs/Rx';

// angular2 beta.14
// import {bootstrap} from 'angular2/platform/browser';
// import {HTTP_PROVIDERS} from 'angular2/http';

// angular2 rc.1
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app/app.component';

bootstrap(AppComponent, [ HTTP_PROVIDERS ]);
