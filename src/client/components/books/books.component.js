'use strict';

import {Component} from 'angular2/core';

@Component({
  selector: 'my-books',
  templateUrl: 'components/books/books.component.html',
  styleUrls: ['components/books/books.component.css']
})
export class BooksComponent{
  constructor(){
    this.title = "Books";
  }
}
