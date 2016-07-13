// angular2 rc.4
import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'rxjs/Rx';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {LocationStrategy,
        HashLocationStrategy} from '@angular/common';

// NOTE: This is what we need to enable to start using non-deprecated forms
// import { disableDeprecatedForms, provideForms } from '@angular/forms';

import {AppComponent} from './app/app.component';
import {APP_ROUTER_PROVIDERS} from './app/app.routes';

let PROD_MODE = false;//set by gulpfile.js
if(PROD_MODE){
  enableProdMode();
}

bootstrap(AppComponent, [APP_ROUTER_PROVIDERS,
                         { provide: LocationStrategy,
                           useClass: HashLocationStrategy }
                         // disableDeprecatedForms(),
                         // provideForms()
                         ])
.catch(err => console.error(err));
