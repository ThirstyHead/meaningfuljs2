'use strict';

import {Component, EventEmitter} from 'angular2/core';
import {BooksService} from './books.service';
import {BookFormComponent} from './book-form.component';

@Component({
  selector: 'my-books',
  templateUrl: 'components/books/books.component.html',
  styleUrls: ['components/books/books.component.css'],
  directives: [BookFormComponent],
  inputs: ['newBook']
})
export class BooksComponent{
  constructor(booksService){
    this.title = "Books";
    this.booksService = booksService;
    this.books = [];
    this.newBookEventListener = new EventEmitter();
  }

  static get parameters(){
    return [[BooksService]];
  }

  ngOnInit(){
    this.getBooks();
    this.newBookEventListener.subscribe( (newBook) => {
      console.log("Hey, look what I just heard about:");
      console.dir(newBook);
    })
  }

  getBooks(){
    this.booksService.getList()
                     .subscribe(
                       books => this.books = books,
                       error => this.errorMessage = error
                     )
  }

}
