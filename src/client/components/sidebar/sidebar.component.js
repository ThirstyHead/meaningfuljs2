'use strict';

import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'my-sidebar',
  templateUrl: 'components/sidebar/sidebar.component.html',
  styleUrls: ['components/sidebar/sidebar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SidebarComponent{
  constructor(router){
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
}
