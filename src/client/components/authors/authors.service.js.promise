import {Injectable} from 'angular2/core';
import {AUTHORS} from './mock-authors';

@Injectable()
export class AuthorsService{
    constructor() {
      console.log('AuthorsService.constructor()');
      this.list = AUTHORS;
    }

    getList(){
        return Promise.resolve(this.list);
    }

    getItem(id){
      let result = this.list.find( (element, index, array) => {
        return element.id === id;
      });
      return Promise.resolve(result);
    }
}
