'use strict';

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

// Services (e.g. Providers)
import {HTTP_PROVIDERS} from '@angular/http';
import {AuthorsService} from '../authors/authors.service';
import {BooksService} from '../books/books.service';

// Components
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES, SidebarComponent],
  providers: [AuthorsService, BooksService, HTTP_PROVIDERS],
  templateUrl: 'components/app/app.component.html',
  styleUrls: ['components/app/app.component.css']
})
export class AppComponent{
  constructor(){
    this.title = 'My First Angular 2 App';
  }

  // Angular 2 Dependency Injection for ECMAScript 6
  // If you're using TypeScript, you can use @Inject on
  // constructor parameters. Sadly, this is not valid
  // ES6 or ES7 syntax.
  // NOTE: 1st in call order
  static get parameters() {

  }

  ngOnInit() {

  }

}
