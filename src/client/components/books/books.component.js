'use strict';

import {Component} from 'angular2/core';
import {BooksService} from './books.service';

@Component({
  selector: 'my-books',
  templateUrl: 'components/books/books.component.html',
  styleUrls: ['components/books/books.component.css']
})
export class BooksComponent{
  constructor(booksService){
    this.title = "Books";
    this.booksService = booksService;
    this.books = [];
  }

  static get parameters(){
    return [[BooksService]];
  }

  ngOnInit(){
    this.getBooks();
  }

  getBooks(){
    this.booksService.getList()
                     .subscribe(
                       books => this.books = books,
                       error => this.errorMessage = error
                     )
  }

}
