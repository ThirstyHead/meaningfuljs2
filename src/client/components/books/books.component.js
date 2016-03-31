'use strict';

import {Component} from 'angular2/core';
import {BooksService} from './books.service';

@Component({
  selector: 'my-books',
  templateUrl: 'components/books/books.component.html',
  styleUrls: ['components/books/books.component.css']
})
export class BooksComponent{
  constructor(){
    this.title = "Books";
    // this.booksService = booksService;
    this.bookList = [];
  }

  // Angular 2 Dependency Injection for ECMAScript 6
  // If you're using TypeScript, you can use @Inject on
  // constructor parameters. Sadly, this is not valid
  // ES6 or ES7 syntax.
  // NOTE: 1st in call order
  static get parameters(){
    // return [[BooksService]];
  }

  ngOnInit(){
    // this.getBooks();
    console.log(this.bookList);
  }

  getBooks(){
    // this.booksService.getList()
    //                  .subscribe(
    //                    books => this.bookList = books,
    //                    error => this.errorMessage = error
    //                  )
  }

}
