'use strict';

import {Component} from 'angular2/core';
import {AuthorsService} from './authors.service';

@Component({
  selector: 'my-authors',
  templateUrl: 'components/authors/authors.component.html',
  styleUrls: ['components/authors/authors.component.css']
})
export class AuthorsComponent{
  constructor(authorsService){
    this.title = "Authors";
    this.authorsService = authorsService;
    this.list = [];
  }

  static get parameters() {
    return [[AuthorsService]];
  }

  ngOnInit() {
    this.authorsService.getList()
      .then( (items) => {
          this.list = items;
          console.dir(this.list);
      })
  }
}
