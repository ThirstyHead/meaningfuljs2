'use strict';

import {Component, OnInit} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

// For using #location
import {provide} from '@angular/core';
import {LocationStrategy, Location, HashLocationStrategy } from '@angular/common';

// Services (e.g. Providers)
import {HTTP_PROVIDERS} from '@angular/http';
import {AuthorsService} from '../authors/authors.service';
import {BooksService} from '../books/books.service';

// Components
import {SidebarComponent} from '../sidebar/sidebar.component';
import {BooksComponent} from '../books/books.component';
import {AuthorsComponent} from '../authors/authors.component';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES, SidebarComponent],
  providers: [AuthorsService, BooksService, HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })],
  templateUrl: 'components/app/app.component.html',
  styleUrls: ['components/app/app.component.css']
})
@RouteConfig([
  {
    path: '/books',
    name: 'Books',
    component: BooksComponent,
    useAsDefault: true
  },
  {
    path: '/authors',
    name: 'Authors',
    component: AuthorsComponent
  }
])
export class AppComponent{
  constructor(router){
    this.title = "My First Angular 2 App";
    this.router = router;
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
