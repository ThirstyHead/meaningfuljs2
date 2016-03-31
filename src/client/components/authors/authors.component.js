'use strict';

import {Component} from 'angular2/core';

@Component({
  selector: 'my-authors',
  templateUrl: 'components/authors/authors.component.html',
  styleUrls: ['components/authors/authors.component.css']
})
export class AuthorsComponent{
  constructor(){
    this.title = "Authors";
  }
}
