'use strict';

import {Component} from 'angular2/core';
import {BooksService} from './books.service';
import {BookFormComponent} from './book-form.component';

@Component({
  selector: 'my-books',
  templateUrl: 'components/books/books.component.html',
  styleUrls: ['components/books/books.component.css'],
  directives: [BookFormComponent]
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

  delete(book){
    this.booksService.delete(book)
                     .subscribe(
                       result => console.log(result),
                       error => this.errorMessage = error
                     )

  }


}
