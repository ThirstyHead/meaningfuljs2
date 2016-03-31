'use strict';

import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

// For using #location instead of /location
import {provide} from 'angular2/core';
import {LocationStrategy, Location, HashLocationStrategy } from 'angular2/router';

import {SidebarComponent} from '../sidebar/sidebar.component';
import {BooksComponent} from '../books/books.component';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES, SidebarComponent],
  providers: [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })],
  templateUrl: 'components/app/app.component.html',
  styleUrls: ['components/app/app.component.css']
})
@RouteConfig([
  {
    path: '/books',
    name: 'Books',
    component: BooksComponent,
    useAsDefault: true
  }
])
export class AppComponent{
  constructor(router){
    this.router = router;
    this.title = "My First Angular 2 App";
  }

  // Angular 2 Dependency Injection for ECMAScript 6
  // If you're using TypeScript, you can use @Inject on
  // constructor parameters. Sadly, this is not valid
  // ES6 or ES7 syntax.
  // NOTE: 1st in call order
  static get parameters() {
    return [[Router]];
  }

  ngOnInit() {

  }

}
