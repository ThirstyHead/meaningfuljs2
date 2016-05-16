'use strict';

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthorsService{
  constructor(http){
    this.http = http;
    this.url = 'mock/authors';
  }

  static get parameters(){
    return [[Http]];
  }

  ngOnInit(){

  }

  getList(){
    return this.http.get(this.url)
                    .map( res => res.json() )
                    .do( data => console.dir(data) )
                    .catch(this.handleError);
  }

  handleError(err){
    console.error(err);
    return Observable.throw(error.json().error || 'Error in AuthorsService');
  }
}
