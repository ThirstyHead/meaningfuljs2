'use strict';

import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Book} from './book';
import {BooksService} from './books.service';

@Component({
    selector: 'my-book-form',
    templateUrl: 'components/books/book-form.component.html',
    styleUrls: ['components/books/book-form.component.css']
})
export class BookFormComponent{
    constructor(booksService){
      this.booksService = booksService;
      this.formats = ['Paper', 'PDF', 'EPub'];
      this.book = new Book({});
    }

    static get parameters(){
      return [[BooksService]];
    }

    onSubmit(){
      // console.dir(this.book);
      this.booksService.create(this.book)
                       .subscribe(
                         item => {
                           this.book = item;
                           console.dir(this.book);
                         },
                         err => console.error(err)
                       );
    }
}
