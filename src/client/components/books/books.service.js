'use strict';

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BooksService{
  constructor(http){
    this.http = http;
    this.url = '/mock/books';
  }

  static get parameters(){
    return [[Http]];
  }

  ngOnInit(){

  }

  getList(){
    return this.http.get(this.url)
                    .map( res => res.json() )
                    .do( data => {
                      console.log("BooksService.getList()");
                      console.dir(data)
                    })
                    .catch(this.handleError);
  }

  handleError(err){
    console.error(err);
    return Observable.throw(error.json().error || 'Error in BooksService');
  }

  create(obj){
    console.log("BooksService.create()");

    //strip id, since this is a new object
    delete obj.id;

    let body = JSON.stringify(obj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options)
                    .map( res => {
                      return res.json();
                    })
                    .catch(this.handleError);
  }

  update(obj){
    console.log("BooksService.update()");

    let body = JSON.stringify(obj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.url}/${obj.id}`, body, options)
                    .map( res => {
                      return res.json();
                    })
                    .catch(this.handleError);
  }

  delete(obj){
    console.log("BooksService.delete()");
    return this.http.delete(`${this.url}/${obj.id}`)
                    .map( res => {
                      return res.json();
                    })
                    .catch(this.handleError);
  }

}
