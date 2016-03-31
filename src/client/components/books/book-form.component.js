'use strict';

import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Book} from './book';

@Component({
    selector: 'my-book-form',
    templateUrl: 'components/books/book-form.component.html',
    styleUrls: ['components/books/book-form.component.css']
})
export class BookFormComponent{
    constructor(){
      this.formats = ['Paper', 'PDF', 'EPub'];
      this.book = new Book({});
    }

    onSubmit(){
      console.dir(this.book);
    }

    //debug helper
    get diagnostic(){
      return JSON.stringify(this.book);
    }
}
