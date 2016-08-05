'use strict';

import {DatabaseService} from '../database/database.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SongsService {
  constructor(databaseService){
    this.databaseService = databaseService;
    this.db = undefined;

    this.initialize();
  }

  static get parameters() {
    return [[DatabaseService]];
  }

  initialize() {
    this.db = this.databaseService.connectToLocalDatabase('songs');
  }

  /**
   * Returns an Observable list
   */
  getList(){
    return Observable.fromPromise(this.db.allDocs({ include_docs: true}))
                     .do( data => console.dir(data) )
                     .catch(this.handleError);
  }

  /**
   * Saves a document
   */
  save(system){
    this.db.post(system)
           .then( doc => {
             return doc;
           });
  }

  /**
   * Get changes (for event listening)
   */
  getChanges(){
    return Observable.fromEvent(this.db.changes({since:'now', live:true}), 'change');
  }

  handleError(err){
    console.error(err);
    return Observable.throw(err.json().error || 'Error in SongsService');
  }
}
