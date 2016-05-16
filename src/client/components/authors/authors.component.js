'use strict';

import {Component} from '@angular/core';
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
    this.authors = [];
  }

  static get parameters() {
    return [[AuthorsService]];
  }

  ngOnInit(){
    this.getAuthors();
  }

  getAuthors(){
    this.authorsService.getList()
                       .subscribe(
                         authors => this.authors = authors,
                         error => this.errorMessage = error
                       )
  }}
